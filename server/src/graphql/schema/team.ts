import gql from "graphql-tag";

export default gql`
  type Team {
    teamId: String!
    teamName: String!
    teamImage: String
    teamOwner: User!
    teamMembers: [User!]!
    defaultChannelId: String!
  }
  type TeamResponse {
    teamId: String!
    teamName: String!
    teamImage: String
    defaultChannelId: String!
  }
  type TeamWithRequstType {
    team: TeamResponse!
    requestStatus: RequestStatus!
  }

  input CreateTeamInput {
    teamName: String!
  }

  type Query {
    getTeam(teamId: String!): TeamResponse! @auth
    getUserTeams: [TeamResponse!]! @auth
    getTeamInvites: [TeamWithRequstType!]! @auth
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): TeamResponse @auth
    inviteTeam(teamId: String!, userToInviteId: String!): Boolean @auth
    respondTeamInvite(teamId: String!, isAccepted: Boolean!): Boolean @auth
  }
`;
