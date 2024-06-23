import gql from "graphql-tag";

export default gql`
  type DirectMessage {
    messageId: String!
    sender: SubUser!
    receiver: SubUser!
    type: DirectMessageType!
    message: String!
    createdAt: Date!
  }
  enum DirectMessageType {
    TEXT
    MEDIA
  }

  type Query {
    getDirectMessages(
      otherUserId: String!
      messageCount: Int!
      page: Int!
    ): [DirectMessage]!
  }

  type Mutation {
    createDirectMessage(receiverId: String!, text: String!): Boolean!
  }
  type Subscription {
    newDirectMessage: DirectMessage!
  }
`;
