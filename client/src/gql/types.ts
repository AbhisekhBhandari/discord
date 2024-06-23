import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AuthError = Error & {
  __typename?: 'AuthError';
  message: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type AuthResponse = AuthError | User;

export type Channel = {
  __typename?: 'Channel';
  channelId: Scalars['String']['output'];
  channelName: Scalars['String']['output'];
  channelType: ChannelType;
  teamId: Scalars['String']['output'];
};

export type ChannelError = Error & {
  __typename?: 'ChannelError';
  message: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type ChannelList = {
  __typename?: 'ChannelList';
  channels: Array<Channel>;
  team: TeamResponse;
};

export enum ChannelType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateChannelInput = {
  channelName: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};

export type CreateMessageInput = {
  channelId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type CreateTeamInput = {
  teamName: Scalars['String']['input'];
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  createdAt: Scalars['Date']['output'];
  message: Scalars['String']['output'];
  messageId: Scalars['String']['output'];
  receiver: SubUser;
  sender: SubUser;
  type: DirectMessageType;
};

export enum DirectMessageType {
  Media = 'MEDIA',
  Text = 'TEXT'
}

export type Error = {
  message?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type GetChannelsResponse = ChannelError | ChannelList;

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['Date']['output'];
  message: Scalars['String']['output'];
  messageId: Scalars['String']['output'];
  sender: SubUser;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  channel: Channel;
  messages: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Scalars['Boolean']['output'];
  createDirectMessage: Scalars['Boolean']['output'];
  createMessage: Message;
  createTeam?: Maybe<TeamResponse>;
  friendRequestRespond: Scalars['Boolean']['output'];
  friendRequestSend: Scalars['Boolean']['output'];
  inviteTeam?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthResponse>;
  logout: Scalars['Boolean']['output'];
  register?: Maybe<AuthResponse>;
  respondTeamInvite?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateDirectMessageArgs = {
  receiverId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationFriendRequestRespondArgs = {
  isAccepted: Scalars['Boolean']['input'];
  senderId: Scalars['ID']['input'];
};


export type MutationFriendRequestSendArgs = {
  receiverId: Scalars['ID']['input'];
};


export type MutationInviteTeamArgs = {
  teamId: Scalars['String']['input'];
  userToInviteId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRespondTeamInviteArgs = {
  isAccepted: Scalars['Boolean']['input'];
  teamId: Scalars['String']['input'];
};

export type PendingRequestUsersResponse = {
  __typename?: 'PendingRequestUsersResponse';
  requestDirection: RequestType;
  user: SubUser;
};

export type Query = {
  __typename?: 'Query';
  getChannel?: Maybe<Channel>;
  getChannels: GetChannelsResponse;
  getDirectMessages: Array<Maybe<DirectMessage>>;
  getFriends: Array<SubUser>;
  getMessages: MessageResponse;
  getTeam: TeamResponse;
  getTeamInviteUsers: Array<SubUser>;
  getTeamInvites: Array<TeamWithRequstType>;
  getTeamUsers: Array<SubUser>;
  getUser: SubUser;
  getUserTeams: Array<TeamResponse>;
  getUsers: Array<SubUser>;
  pendingRequestUsers: Array<PendingRequestUsersResponse>;
  retrieveUsersWithFriendRequestStatus: Array<SubUser>;
};


export type QueryGetChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryGetChannelsArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryGetDirectMessagesArgs = {
  messageCount: Scalars['Int']['input'];
  otherUserId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
};


export type QueryGetMessagesArgs = {
  channelId: Scalars['String']['input'];
  messageCount: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTeamArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryGetTeamInviteUsersArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryGetTeamUsersArgs = {
  teamId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterInput = {
  dateOfBirth: Scalars['Date']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum RequestStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum RequestType {
  Received = 'RECEIVED',
  Sent = 'SENT'
}

export type SubUser = {
  __typename?: 'SubUser';
  profileImage?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageCreated: Message;
  newDirectMessage: DirectMessage;
};


export type SubscriptionMessageCreatedArgs = {
  channelId: Scalars['String']['input'];
};

export type Team = {
  __typename?: 'Team';
  defaultChannelId: Scalars['String']['output'];
  teamId: Scalars['String']['output'];
  teamImage?: Maybe<Scalars['String']['output']>;
  teamMembers: Array<User>;
  teamName: Scalars['String']['output'];
  teamOwner: User;
};

export type TeamResponse = {
  __typename?: 'TeamResponse';
  defaultChannelId: Scalars['String']['output'];
  teamId: Scalars['String']['output'];
  teamImage?: Maybe<Scalars['String']['output']>;
  teamName: Scalars['String']['output'];
};

export type TeamWithRequstType = {
  __typename?: 'TeamWithRequstType';
  requestStatus: RequestStatus;
  team: TeamResponse;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  dateOfBirth: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UsersRequestRelation = {
  __typename?: 'UsersRequestRelation';
  requestType: RequestType;
  user: SubUser;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename: 'AuthError', path: string, message: string } | { __typename: 'User', userId: string, username: string, email: string, profileImage?: string | null, dateOfBirth: any, createdAt: any } | null };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename: 'AuthError', path: string, message: string } | { __typename: 'User', userId: string, username: string, email: string, profileImage?: string | null, dateOfBirth: any, createdAt: any } | null };

export type GetChannelsQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type GetChannelsQuery = { __typename?: 'Query', getChannels: { __typename: 'ChannelError', message: string, path: string } | { __typename: 'ChannelList', channels: Array<{ __typename?: 'Channel', channelId: string, channelName: string, channelType: ChannelType }>, team: { __typename?: 'TeamResponse', teamName: string, teamId: string } } };

export type GetChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type GetChannelQuery = { __typename?: 'Query', getChannel?: { __typename?: 'Channel', channelId: string, channelName: string } | null };

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: boolean };

export type GetMessagesWithChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
  messageCount: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessagesWithChannelQuery = { __typename?: 'Query', getMessages: { __typename?: 'MessageResponse', messages: Array<{ __typename?: 'Message', createdAt: any, message: string, messageId: string, sender: { __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null } }>, channel: { __typename?: 'Channel', teamId: string, channelName: string, channelType: ChannelType, channelId: string } } };

export type GetMessagesQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  messageCount: Scalars['Int']['input'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: { __typename?: 'MessageResponse', messages: Array<{ __typename?: 'Message', messageId: string, message: string, createdAt: any, sender: { __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null } }> } };

export type GetDirectMessagesQueryVariables = Exact<{
  otherUserId: Scalars['String']['input'];
  messageCount: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetDirectMessagesQuery = { __typename?: 'Query', getDirectMessages: Array<{ __typename?: 'DirectMessage', messageId: string, createdAt: any, message: string, sender: { __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null } } | null> };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', createdAt: any, message: string, messageId: string } };

export type CreateDirectMessageMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateDirectMessageMutation = { __typename?: 'Mutation', createDirectMessage: boolean };

export type ChannelMessagaSubscriptionSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ChannelMessagaSubscriptionSubscription = { __typename?: 'Subscription', messageCreated: { __typename?: 'Message', message: string, messageId: string, createdAt: any, sender: { __typename?: 'SubUser', profileImage?: string | null, userId: string, username: string } } };

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam?: { __typename?: 'TeamResponse', teamId: string, teamImage?: string | null, teamName: string } | null };

export type GetUserTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTeamsQuery = { __typename?: 'Query', getUserTeams: Array<{ __typename?: 'TeamResponse', teamId: string, teamImage?: string | null, teamName: string, defaultChannelId: string }> };

export type GetTeamQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', getTeam: { __typename?: 'TeamResponse', teamId: string, teamImage?: string | null, teamName: string } };

export type GetTeamInvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamInvitesQuery = { __typename?: 'Query', getTeamInvites: Array<{ __typename?: 'TeamWithRequstType', requestStatus: RequestStatus, team: { __typename?: 'TeamResponse', teamId: string, teamImage?: string | null, teamName: string } }> };

export type InviteToTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  userToInviteId: Scalars['String']['input'];
}>;


export type InviteToTeamMutation = { __typename?: 'Mutation', inviteTeam?: boolean | null };

export type RespondTeamInviteMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  isAccepted: Scalars['Boolean']['input'];
}>;


export type RespondTeamInviteMutation = { __typename?: 'Mutation', respondTeamInvite?: boolean | null };

export type GetUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'SubUser', profileImage?: string | null, userId: string, username: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null }> };

export type FriendRequestSendMutationVariables = Exact<{
  receiverId: Scalars['ID']['input'];
}>;


export type FriendRequestSendMutation = { __typename?: 'Mutation', friendRequestSend: boolean };

export type RetrieveUsersWithFriendRequestStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveUsersWithFriendRequestStatusQuery = { __typename?: 'Query', retrieveUsersWithFriendRequestStatus: Array<{ __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null }> };

export type GetTeamUsersQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type GetTeamUsersQuery = { __typename?: 'Query', getTeamUsers: Array<{ __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null }> };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', getFriends: Array<{ __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null }> };

export type FriendRequestRespondMutationVariables = Exact<{
  senderId: Scalars['ID']['input'];
  isAccepted: Scalars['Boolean']['input'];
}>;


export type FriendRequestRespondMutation = { __typename?: 'Mutation', friendRequestRespond: boolean };

export type GetTeamInviteUsersQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type GetTeamInviteUsersQuery = { __typename?: 'Query', getTeamInviteUsers: Array<{ __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null }> };

export type PendingRequestUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingRequestUsersQuery = { __typename?: 'Query', pendingRequestUsers: Array<{ __typename?: 'PendingRequestUsersResponse', requestDirection: RequestType, user: { __typename?: 'SubUser', username: string, userId: string, profileImage?: string | null } }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChannels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"channelName"}},{"kind":"Field","name":{"kind":"Name","value":"channelType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"channelName"}}]}}]}}]} as unknown as DocumentNode<GetChannelQuery, GetChannelQueryVariables>;
export const CreateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateChannelMutation, CreateChannelMutationVariables>;
export const GetMessagesWithChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagesWithChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageCount"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"channelName"}},{"kind":"Field","name":{"kind":"Name","value":"channelType"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesWithChannelQuery, GetMessagesWithChannelQueryVariables>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageCount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetDirectMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDirectMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otherUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDirectMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otherUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otherUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageCount"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetDirectMessagesQuery, GetDirectMessagesQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateDirectMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDirectMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDirectMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;
export const ChannelMessagaSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMessagaSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<ChannelMessagaSubscriptionSubscription, ChannelMessagaSubscriptionSubscriptionVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"teamImage"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const GetUserTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"teamImage"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"defaultChannelId"}}]}}]}}]} as unknown as DocumentNode<GetUserTeamsQuery, GetUserTeamsQueryVariables>;
export const GetTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"teamImage"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]}}]} as unknown as DocumentNode<GetTeamQuery, GetTeamQueryVariables>;
export const GetTeamInvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamInvites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamInvites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"teamImage"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestStatus"}}]}}]}}]} as unknown as DocumentNode<GetTeamInvitesQuery, GetTeamInvitesQueryVariables>;
export const InviteToTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteToTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userToInviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userToInviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userToInviteId"}}}]}]}}]} as unknown as DocumentNode<InviteToTeamMutation, InviteToTeamMutationVariables>;
export const RespondTeamInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RespondTeamInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAccepted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"respondTeamInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isAccepted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAccepted"}}}]}]}}]} as unknown as DocumentNode<RespondTeamInviteMutation, RespondTeamInviteMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const FriendRequestSendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FriendRequestSend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendRequestSend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}}]}]}}]} as unknown as DocumentNode<FriendRequestSendMutation, FriendRequestSendMutationVariables>;
export const RetrieveUsersWithFriendRequestStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RetrieveUsersWithFriendRequestStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retrieveUsersWithFriendRequestStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]} as unknown as DocumentNode<RetrieveUsersWithFriendRequestStatusQuery, RetrieveUsersWithFriendRequestStatusQueryVariables>;
export const GetTeamUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]} as unknown as DocumentNode<GetTeamUsersQuery, GetTeamUsersQueryVariables>;
export const GetFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]} as unknown as DocumentNode<GetFriendsQuery, GetFriendsQueryVariables>;
export const FriendRequestRespondDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FriendRequestRespond"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAccepted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendRequestRespond"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isAccepted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAccepted"}}}]}]}}]} as unknown as DocumentNode<FriendRequestRespondMutation, FriendRequestRespondMutationVariables>;
export const GetTeamInviteUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamInviteUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamInviteUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]} as unknown as DocumentNode<GetTeamInviteUsersQuery, GetTeamInviteUsersQueryVariables>;
export const PendingRequestUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PendingRequestUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingRequestUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestDirection"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]}}]} as unknown as DocumentNode<PendingRequestUsersQuery, PendingRequestUsersQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;