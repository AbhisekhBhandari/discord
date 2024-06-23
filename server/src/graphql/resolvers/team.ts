import { waitForDebugger } from "inspector";
import {
  MutationCreateTeamArgs,
  Resolvers,
  TeamResponse,
} from "../../generated/graphql";
import { checkAuth } from "../../lib/augment";
import { prisma } from "../../lib/prisma";

const teamResolvers: Resolvers = {
  Query: {
    getTeam: async (parent, { teamId }, { prisma, userId }) => {
      if (!userId) throw new Error("Not Authenticated");
      const team = await prisma.team.findFirst({ where: { teamId } });
      return team;
    },
    getUserTeams: async (parent, args, { prisma, userId }) => {
      if (!userId) throw new Error("Not Authenticated");
      const userTeams = await prisma.team.findMany({
        where: { members: { some: { userId } } },
      });

      return userTeams;
    },
    getTeamInvites: async (parent, args, { prisma, userId }) => {
      console.log("userIDasdadas", userId);

      const teams = await prisma.teamRequest.findMany({
        where: {
          AND: [{ userId }, { requestStatus: "PENDING" }],
        },
        select: { requestStatus: true, team: true },
      });
      return teams;
    },
  },
  Mutation: {
    createTeam: async (
      parent,
      args: MutationCreateTeamArgs,
      { prisma, res, token, userId }
    ) => {
      try {
        if (!userId) throw new Error("Not Authenticated");
        const {
          input: { teamName },
        } = args;
        const team = await prisma.team.create({
          data: {
            teamName,
            ownerId: userId,
          },
        });
        const generalChannel = await prisma.channel.create({
          data: { channelName: "general", teamId: team.teamId },
        });
        await prisma.member.create({
          data: { teamId: team.teamId, userId },
        });
        const updateTeam = prisma.team.update({
          where: { teamId: team.teamId },
          data: { defaultChannelId: generalChannel.channelId },
        });
        return updateTeam;
      } catch (err) {}
    },
    inviteTeam: async (
      parent,
      { userToInviteId, teamId },
      { prisma, userId }
    ) => {
      await prisma.teamRequest.create({
        data: {
          teamId,
          userId: userToInviteId,
        },
      });
      return true;
    },
    respondTeamInvite: async (
      parent,
      { isAccepted, teamId },
      { prisma, userId }
    ) => {
      if (!userId) throw new Error("Not authenticated");
      const updateTeamRequest = prisma.teamRequest.update({
        where: {
          teamId_userId: {
            teamId,
            userId,
          },
        },
        data: {
          requestStatus: isAccepted ? "ACCEPTED" : "REJECTED",
        },
      });
      if (isAccepted) {
        const addMember = prisma.member.create({
          data: {
            teamId,
            userId,
          },
        });
        await prisma.$transaction([updateTeamRequest, addMember]);
      } else {
        await updateTeamRequest;
        return false;
      }
      return true;
    },
  },
};

export default teamResolvers;
