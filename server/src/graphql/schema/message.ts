import gql from "graphql-tag";

export default gql`
  type Message {
    messageId: String!
    message: String!
    sender: SubUser!
    createdAt: Date!
  }

  type MessageResponse {
    messages: [Message!]!
    channel: Channel!
  }

  input CreateMessageInput {
    channelId: String!
    message: String!
  }
  

  type Query {
    getMessages(channelId: String!, messageCount: Int!, page: Int): MessageResponse!
  }
  type Mutation {
    createMessage(input: CreateMessageInput!): Message! 
  }

  type Subscription {
    messageCreated(channelId: String!): Message! 
  }
`;
