import { PubSub, withFilter } from "graphql-subscriptions";
import { Resolvers } from "../../generated/graphql";
import { pubsub } from "../../lib/pubsub";

const NEW_DIRECT_MESSAGE = "NEW_DIRECT_MESSAGE";

const PrivMessageResolver: Resolvers = {
  Query: {
    getDirectMessages: async (
      _,
      { otherUserId, messageCount, page },
      { prisma, userId }
    ) => {
      const messages = await prisma.directMessage.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: userId },
          ],
        },
        include: { sender: { select: { userId: true, username: true } } },
        orderBy: { createdAt: "desc" },
        take: messageCount,
        skip: page ? page : undefined,
      });
      return messages;
    },
  },
  Mutation: {
    createDirectMessage: async (
      _,
      { receiverId, text },
      { prisma, userId = "70092edc-48bf-46d9-9fa5-cf9da5b5a769" }
    ) => {
      try {
        // if (!userId) throw Error("Unauthenticated");
        const createMessage = await prisma.directMessage.create({
          data: { receiverId, message: text, senderId: userId },
          include: { sender: true },
        });

        pubsub?.publish(NEW_DIRECT_MESSAGE, createMessage);
        return true;
      } catch (err) {
        console.error("ERR CREATEING MESSAGE", err);
        return false;
      }
    },
    // createInviteTeam: async ()=>{}
  },
  Subscription: {
    newDirectMessage: {
      subscribe: withFilter(
        (_, __, ___) => {
          return pubsub.asyncIterator(NEW_DIRECT_MESSAGE);
        },
        (payload, args, context) => {
          // console.log("sub context", context, "pay", payload);
          const test =
            payload.senderId === context.userId ||
            payload.receiverId === context.userId;
          console.log("test", test);

          return test;
        }
      ),
      resolve: async (payload, _, __) => {
        console.log("resolving", payload);
        return payload;
      },
    },
  },
};
export default PrivMessageResolver;
