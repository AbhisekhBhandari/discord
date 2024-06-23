import gql from "graphql-tag";

export default gql`
  directive @auth on FIELD_DEFINITION | OBJECT

  type User {
    userId: ID!
    username: String!
    email: String!
    profileImage: String
    dateOfBirth: Date!
    createdAt: Date!
  }
  type SubUser {
    userId: ID!
    username: String!
    profileImage: String
  }
  type UsersRequestRelation {
    user: SubUser!
    requestType: RequestType!
  }

  type AuthError implements Error {
    path: String!
    message: String!
  }
  union AuthResponse = User | AuthError

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    dateOfBirth: Date!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  enum RequestStatus {
    ACCEPTED
    REJECTED
    PENDING
  }
  enum RequestType {
    SENT
    RECEIVED
  }
  type PendingRequestUsersResponse {
    user: SubUser!
    requestDirection: RequestType!
  }

  type Query {
    getUser(userId: String): SubUser! @auth
    getUsers: [SubUser!]! @auth
    getTeamUsers(teamId: String!): [SubUser!]! @auth
    retrieveUsersWithFriendRequestStatus: [SubUser!]! @auth
    pendingRequestUsers: [PendingRequestUsersResponse!]! @auth
    getFriends: [SubUser!]! @auth
    getTeamInviteUsers(teamId: String!): [SubUser!]! @auth
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse
    login(loginInput: LoginInput!): AuthResponse
    logout: Boolean! @auth
    friendRequestSend(receiverId: ID!): Boolean! @auth
    friendRequestRespond(senderId: ID!, isAccepted: Boolean!): Boolean! @auth
  }
`;
