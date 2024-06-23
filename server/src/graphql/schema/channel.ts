import gql from "graphql-tag";
import { ChannelType } from "@prisma/client";

export default gql`
  type Channel {
    channelId: String!
    channelName: String!
    channelType: ChannelType!
    teamId: String!
  }
  # channelId: string; channelName: string; channelType: ChannelType; teamId: string;

  enum ChannelType {
    PRIVATE
    PUBLIC
  }
  input CreateChannelInput {
    channelName: String!
    teamId: String!
  }
  type ChannelList {
    channels: [Channel!]!
    team: TeamResponse!
  }
  type ChannelError implements Error {
    path: String!
    message: String!
  }

  union GetChannelsResponse = ChannelList | ChannelError

  type Query {
    getChannels(teamId: String!): GetChannelsResponse! @auth
    getChannel(channelId: String!): Channel @auth
  }
  type Mutation {
    createChannel(input: CreateChannelInput!): Boolean! @auth
  }
`;
