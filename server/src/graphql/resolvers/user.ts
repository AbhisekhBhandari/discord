import {
  UserResolvers,
  Resolvers,
  MutationResolvers,
  QueryResolvers,
  UsersRequestRelation,
} from "../../generated/graphql";
import bcrypt from "bcrypt";
import { createTokens } from "../../lib/token";
import _ from "lodash";
import { setTokens } from "../../lib/utils";
import { getAddFriendUsers } from "../../lib/raw-queries";
import { RawQueryResult, RequestType } from "../../types";

const userQuery: QueryResolvers = {
  getUser: async (parent, { userId: otherUserId }, { prisma, userId }) => {
    if (!userId) throw new Error("Not authenticated");
    const user = await prisma.user.findFirst({
      where: { userId: otherUserId ?? userId },
      select: { userId: true, username: true, profileImage: true },
    });
    return user;
  },
  getUsers: async (parent, args, { prisma, userId }) => {
    if (!userId) throw new Error("Not authenticated");
    const users = await prisma.user.findMany({
      where: {
        userId: {
          not: userId,
        },
      },
    });
    return users;
  },
  getTeamUsers: async (parent, { teamId }, { prisma, userId }) => {
    const users = await prisma.user.findMany({
      where: {
        members: { some: { teamId } },
      },
    });
    console.log("uses", users);
    return users;
  },
  getFriends: async (parent, args, { prisma, userId }) => {
    if (!userId) throw new Error("NOt authenticatd");
    const friends = await prisma.friendship.findMany({
      where: { OR: [{ friend1Id: userId }, { friend2Id: userId }] },
      include: {
        friend1: {
          select: { userId: true, username: true, profileImage: true },
        },
        friend2: {
          select: { userId: true, username: true, profileImage: true },
        },
      },
    });
    const friendsMap = friends.map((friend) => {
      if (friend.friend1Id !== userId) return friend.friend1;
      return friend.friend2;
    });
    return friendsMap;
  },
  getTeamInviteUsers: async (parent, { teamId }, { userId, prisma }) => {
    const friendsNotInTeam = await prisma.user.findMany({
      where: {
        OR: [
          {
            friend1: {
              some: {
                friend2Id: userId,
              },
            },
          },
          {
            friend2: {
              some: {
                friend1Id: userId,
              },
            },
          },
        ],
        members: {
          none: {
            teamId: teamId,
          },
        },
      },
    });

    return friendsNotInTeam;
  },

  // @ts-ignore
  retrieveUsersWithFriendRequestStatus: async (
    parent,
    args,
    { userId, prisma }
  ) => {
    if (!userId) throw new Error("Not authenticated");
    const allUsersWithRequestStatus: RawQueryResult[] = await prisma.$queryRaw(
      getAddFriendUsers(userId)
    );

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          userId: userId,
        },
        AND: [
          {
            friend1: {
              none: {
                friend2Id: userId,
              },
            },
          },
          {
            friend2: {
              none: {
                friend1Id: userId,
              },
            },
          },
        ],
        // Exclude users with pending friend requests
        sentRequests: {
          none: {
            receiverId: userId,
            requestStatus: "PENDING",
          },
        },
        receivedRequest: {
          none: {
            senderId: userId,
            requestStatus: "PENDING",
          },
        },
      },
    });
    console.log("users", users);

    return users;
  },
  pendingRequestUsers: async (parent, args, { prisma, userId }) => {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          // Users who sent a pending request to the user
          {
            sentRequests: {
              some: {
                receiverId: userId,
                requestStatus: "PENDING",
              },
            },
          },
          // Users who received a pending request from the user
          {
            receivedRequest: {
              some: {
                senderId: userId,
                requestStatus: "PENDING",
              },
            },
          },
        ],
      },
      select: {
        userId: true,
        username: true,
        email: true,
        profileImage: true,
        dateOfBirth: true,
        createdAt: true,
        sentRequests: {
          where: {
            receiverId: userId,
            requestStatus: "PENDING",
          },
          select: {
            receiverId: true,
          },
        },
        receivedRequest: {
          where: {
            senderId: userId,
            requestStatus: "PENDING",
          },
          select: {
            senderId: true,
          },
        },
      },
    });
    const usersWithPendingRequests = users.map((user) => {
      const requestDirection =
        user.sentRequests.length > 0 ? "RECEIVED" : "SENT";
      return {
        user: user,
        requestDirection,
      };
    });
    return usersWithPendingRequests;
  },
};
const userMutation: MutationResolvers = {
  register: async (parent, args, { prisma, res }) => {
    try {
      const {
        input: { email, password, username, dateOfBirth },
      } = args;
      const isDuplicate = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      });
      if (isDuplicate?.email === email) {
        throw new Error("Email Already Exits");
      } else if (isDuplicate?.username === username) {
        throw new Error("Username Already Taken");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const createUser = await prisma.user.create({
        data: { username, email, password: hashedPassword, dateOfBirth },
      });
      setTokens(res, createUser);

      return { __typename: "User", ..._.omit(createUser, ["password"]) };
    } catch (err) {
      const error = err as Error;
      return {
        __typename: "AuthError",
        message: error.message,
        path: "/register",
      };
    }
  },

  login: async (parent, args, { prisma, res }) => {
    try {
      const {
        loginInput: { email, password },
      } = args;
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) throw Error;
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) throw Error;
      setTokens(res, user);
      return { __typename: "User", ..._.omit(user, ["password"]) };
    } catch (err) {
      return {
        __typename: "AuthError",
        path: "/login",
        message: "Invalid email/password",
      };
    }
  },
  logout: async (parent, args, { prisma, res }) => {
    try {
      res.cookie("token", "", { httpOnly: true, maxAge: 0 });
      res.cookie("refresh-token", "", { httpOnly: true, maxAge: 0 });
      return true;
    } catch (err) {
      return false;
    }
  },
  friendRequestSend: async (parent, { receiverId }, { prisma, userId }) => {
    if (!userId) return false;
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      },
    });
    if (
      existingRequest?.senderId === userId &&
      existingRequest?.receiverId === receiverId &&
      existingRequest.requestStatus == "PENDING"
    )
      return true;

    // if yes, ensure the sender and receiver are properly set and the request status is set to pending.
    if (existingRequest) {
      await prisma.friendRequest.update({
        where: {
          senderId_receiverId: {
            senderId: existingRequest.senderId,
            receiverId: existingRequest.receiverId,
          },
        },
        data: {
          senderId: userId,
          receiverId,
          requestStatus: "PENDING",
        },
      });
    } else {
      await prisma.friendRequest.create({
        data: { senderId: userId, receiverId },
      });
    }
    // if no, create a new

    return true;
  },
  friendRequestRespond: async (
    parent,
    { senderId, isAccepted },
    { prisma, userId }
  ) => {
    if (!userId) return false;

    await prisma.friendRequest.update({
      where: {
        senderId_receiverId: {
          senderId: senderId,
          receiverId: userId,
        },
      },
      data: {
        requestStatus: isAccepted ? "ACCEPTED" : "REJECTED",
      },
    });
    if (isAccepted) {
      await prisma.friendship.create({
        data: {
          friend1Id: senderId,
          friend2Id: userId,
        },
      });
    }
    return true;
  },
};

export default {
  Query: userQuery,
  Mutation: userMutation,
};
