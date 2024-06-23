import { gql } from "graphql-request";

export const GET_USERS_QUERY = gql`
  query getAllUsers {
    allUsers {
      email
      username
      userId
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      refreshToken
      ok
      error {
        message
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error {
        message
      }
      ok
      refreshToken
      token
    }
  }
`;

export const GET_TEAMS_QUERY = gql`
  query GetUserTeams {
    getUserTeams {
      teamId
      teamName
    }
  }
`;

export const GET_CHANNELS = gql`
  query GetChannels($teamId: String!) {
    getChannels(teamId: $teamId) {
      channelName
      channelId
      public
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($channelName: String!, $teamId: String!) {
    createChannel(channelName: $channelName, teamId: $teamId)
  }
`;

export const ADD_MEMBER = gql`
  mutation AddTeamMember($userId: String!, $teamId: String!) {
    addTeamMember(userId: $userId, teamId: $teamId) {
      error {
        path
        message
      }
      ok
    }
  }
`;

export const GET_INV_USERS = gql`
  query InviteUsers($teamId: String!) {
    getInviteUsers(teamId: $teamId) {
      userId
      username
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!, $channelId: String!) {
    createMessage(text: $text, channelId: $channelId)
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($channelId: String!, $skip: Int!) {
    getMessages(channelId: $channelId, skip: $skip) {
      messageId
      text
      createdAt
      sender {
        username
        userId
      }
    }
  }
`;

export const GET_PRIV_MESSAGES = gql`
  query getPrivMessages($otherUserId: String!) {
    getPrivMessages(otherUserId: $otherUserId) {
      createdAt
      messageId
      text
      sender {
        username
        userId
      }
    }
  }
`;

export const SUBSCRIBE_MESSAGE = gql`
  subscription SubChannelMessage($channelId: String!) {
    newChannelMessage(channelId: $channelId) {
      messageId
      text
      createdAt
      sender {
        username
        userId
      }
    }
  }
`;

export const SUBSCRIBE_DIRECT_MESSAGE = gql`
  subscription SubDirectMessage {
    newPrivMessage {
      sender {
        username
        userId
      }
      text
      messageId
      createdAt
    }
  }
`;

export const GET_TEAM_USERS = gql`
  query GetTeamUsers($teamId: String!) {
    getTeamUsers(teamId: $teamId) {
      userId
      username
    }
  }
`;

export const CREATE_PRIV_MESSAGES = gql`
  mutation createPrivMessage($receiverId: String!, $text: String!) {
    createPrivMessage(receiverId: $receiverId, text: $text)
  }
`;
export const SEARCH_USERS = gql`
  query SearchUsers($searchText: String!) {
    searchUsers(searchText: $searchText) {
      username
      userId
    }
  }
`;

export const RECENTLY_MESSAGED_USERS = gql`
  query RecentlyMessagedUsers {
    recentlyMessagedUsers {
      username
      userId
    }
  }
`;
