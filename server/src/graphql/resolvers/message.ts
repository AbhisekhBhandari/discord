import { Resolvers } from "../../generated/graphql";
import _ from "lodash";
import { pubsub } from "../../lib/pubsub";
import { withFilter } from "graphql-subscriptions";

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const MessageResolvers: Resolvers = {
  Query: {
    getMessages: async (
      parent,
      { channelId, messageCount, page },
      { prisma, userId }
    ) => {
      // if (!userId) throw new Error("unauthenticated user");

      const messages = await prisma.message.findMany({
        where: { channelId },
        take: messageCount,
        orderBy: { createdAt: "desc" },
        skip: page ? page : undefined,
      });
      return { messages, channelId: channelId };
    },
  },
  Mutation: {
    createMessage: async (
      parent,
      { input: { channelId, message } },
      {
        prisma,
        // userId,
        userId = "70092edc-48bf-46d9-9fa5-cf9da5b5a769",
      }
    ) => {
      // if (!userId) throw new Error("unauthenticated user");
      const Cmessage = await prisma.message.create({
        data: { message, channelId, senderId: userId },
      });
      const ret = {
        __typename: "Message",
        ...Cmessage,
        channelId,
      };

      pubsub.publish(NEW_CHANNEL_MESSAGE, {
        messageCreated: ret,
        channelId,
      });

      return {
        __typename: "Message",
        ...Cmessage,
      };
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: withFilter(
        (_, __, ___) => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => {
          // return true;
          return payload.channelId === args.channelId;
        }
      ),
      resolve: async (payload, args, { prisma }) => {
        const sender = await prisma.user.findFirst({
          where: { userId: payload.messageCreated.senderId },
          select: {
            userId: true,
            username: true,
            profileImage: true,
          },
        });

        return {
          __typename: "Message",
          ...payload.messageCreated,
          sender,
        };
      },
    },
  },

  Message: {
    sender: async (parent, args, { prisma }) => {
      // @ts-ignore
      const senderId = parent?.senderId as string;
      const getUser = await prisma.user.findFirst({
        where: { userId: senderId },
        select: { userId: true, username: true, profileImage: true },
      });
      return getUser;
    },
  },
  MessageResponse: {
    channel: async (parent, args, { prisma }) => {
      return await prisma.channel.findFirst({
        where: { channelId: parent.channelId },
      });
    },
  },
};
export default MessageResolvers;
