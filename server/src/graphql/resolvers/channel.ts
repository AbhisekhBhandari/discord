import { Resolvers } from "../../generated/graphql";
import { prisma } from "../../lib/prisma";

const ChannelResolvers: Resolvers = {
  Query: {
    getChannel: async (parent, { channelId }, { prisma, userId }) => {
      if (!userId) throw new Error("Not Authenticated");
      const channel = await prisma.channel.findFirst({ where: { channelId } });
      return channel;
    },
    getChannels: async (parent, args, { prisma, userId }) => {
      try {
        if (!userId) throw new Error("Unauthnticated");
        const { teamId } = args;

        const channels = await prisma.channel.findMany({ where: { teamId } });

        return { __typename: "ChannelList", channels };
      } catch (err) {
        return {
          __typename: "ChannelError",
          path: "channels",
          message: "Failed to Fetch Channels",
        };
      }
    },
  },
  Mutation: {
    createChannel: async (parent, args, { prisma, userId }) => {
      try {
        if (!userId) throw new Error("Not Authenticated");
        const {
          input: { channelName, teamId },
        } = args;
        await prisma.channel.create({
          data: { channelName, teamId },
        });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
  ChannelList: {
    team: async (parent, args, context) => {
      const teamId = parent.channels[0].teamId;
      const team = await prisma.team.findFirst({ where: { teamId } });
      return team;
    },
  },
};

export default ChannelResolvers;
