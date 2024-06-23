import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../graphql/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  AuthResponse: ( AuthError ) | ( User );
  GetChannelsResponse: ( ChannelError ) | ( ChannelList );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Error: ( AuthError ) | ( ChannelError );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthError: ResolverTypeWrapper<AuthError>;
  AuthResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AuthResponse']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelError: ResolverTypeWrapper<ChannelError>;
  ChannelList: ResolverTypeWrapper<ChannelList>;
  ChannelType: ChannelType;
  CreateChannelInput: CreateChannelInput;
  CreateMessageInput: CreateMessageInput;
  CreateTeamInput: CreateTeamInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DirectMessage: ResolverTypeWrapper<DirectMessage>;
  DirectMessageType: DirectMessageType;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  GetChannelsResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetChannelsResponse']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Message: ResolverTypeWrapper<Message>;
  MessageResponse: ResolverTypeWrapper<MessageResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PendingRequestUsersResponse: ResolverTypeWrapper<PendingRequestUsersResponse>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  RequestStatus: RequestStatus;
  RequestType: RequestType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubUser: ResolverTypeWrapper<SubUser>;
  Subscription: ResolverTypeWrapper<{}>;
  Team: ResolverTypeWrapper<Team>;
  TeamResponse: ResolverTypeWrapper<TeamResponse>;
  TeamWithRequstType: ResolverTypeWrapper<TeamWithRequstType>;
  User: ResolverTypeWrapper<User>;
  UsersRequestRelation: ResolverTypeWrapper<UsersRequestRelation>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthError: AuthError;
  AuthResponse: ResolversUnionTypes<ResolversParentTypes>['AuthResponse'];
  Boolean: Scalars['Boolean']['output'];
  Channel: Channel;
  ChannelError: ChannelError;
  ChannelList: ChannelList;
  CreateChannelInput: CreateChannelInput;
  CreateMessageInput: CreateMessageInput;
  CreateTeamInput: CreateTeamInput;
  Date: Scalars['Date']['output'];
  DirectMessage: DirectMessage;
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  GetChannelsResponse: ResolversUnionTypes<ResolversParentTypes>['GetChannelsResponse'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Message: Message;
  MessageResponse: MessageResponse;
  Mutation: {};
  PendingRequestUsersResponse: PendingRequestUsersResponse;
  Query: {};
  RegisterInput: RegisterInput;
  String: Scalars['String']['output'];
  SubUser: SubUser;
  Subscription: {};
  Team: Team;
  TeamResponse: TeamResponse;
  TeamWithRequstType: TeamWithRequstType;
  User: User;
  UsersRequestRelation: UsersRequestRelation;
};

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = MyContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthError'] = ResolversParentTypes['AuthError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'User', ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelType?: Resolver<ResolversTypes['ChannelType'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ChannelError'] = ResolversParentTypes['ChannelError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelListResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ChannelList'] = ResolversParentTypes['ChannelList']> = {
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  team?: Resolver<ResolversTypes['TeamResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DirectMessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DirectMessage'] = ResolversParentTypes['DirectMessage']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receiver?: Resolver<ResolversTypes['SubUser'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['SubUser'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DirectMessageType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'ChannelError', ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type GetChannelsResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['GetChannelsResponse'] = ResolversParentTypes['GetChannelsResponse']> = {
  __resolveType: TypeResolveFn<'ChannelError' | 'ChannelList', ParentType, ContextType>;
};

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['SubUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChannel?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'input'>>;
  createDirectMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateDirectMessageArgs, 'receiverId' | 'text'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  createTeam?: Resolver<Maybe<ResolversTypes['TeamResponse']>, ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  friendRequestRespond?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationFriendRequestRespondArgs, 'isAccepted' | 'senderId'>>;
  friendRequestSend?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationFriendRequestSendArgs, 'receiverId'>>;
  inviteTeam?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationInviteTeamArgs, 'teamId' | 'userToInviteId'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginInput'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  respondTeamInvite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRespondTeamInviteArgs, 'isAccepted' | 'teamId'>>;
};

export type PendingRequestUsersResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PendingRequestUsersResponse'] = ResolversParentTypes['PendingRequestUsersResponse']> = {
  requestDirection?: Resolver<ResolversTypes['RequestType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['SubUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryGetChannelArgs, 'channelId'>>;
  getChannels?: Resolver<ResolversTypes['GetChannelsResponse'], ParentType, ContextType, RequireFields<QueryGetChannelsArgs, 'teamId'>>;
  getDirectMessages?: Resolver<Array<Maybe<ResolversTypes['DirectMessage']>>, ParentType, ContextType, RequireFields<QueryGetDirectMessagesArgs, 'messageCount' | 'otherUserId' | 'page'>>;
  getFriends?: Resolver<Array<ResolversTypes['SubUser']>, ParentType, ContextType>;
  getMessages?: Resolver<ResolversTypes['MessageResponse'], ParentType, ContextType, RequireFields<QueryGetMessagesArgs, 'channelId' | 'messageCount'>>;
  getTeam?: Resolver<ResolversTypes['TeamResponse'], ParentType, ContextType, RequireFields<QueryGetTeamArgs, 'teamId'>>;
  getTeamInviteUsers?: Resolver<Array<ResolversTypes['SubUser']>, ParentType, ContextType, RequireFields<QueryGetTeamInviteUsersArgs, 'teamId'>>;
  getTeamInvites?: Resolver<Array<ResolversTypes['TeamWithRequstType']>, ParentType, ContextType>;
  getTeamUsers?: Resolver<Array<ResolversTypes['SubUser']>, ParentType, ContextType, RequireFields<QueryGetTeamUsersArgs, 'teamId'>>;
  getUser?: Resolver<ResolversTypes['SubUser'], ParentType, ContextType, Partial<QueryGetUserArgs>>;
  getUserTeams?: Resolver<Array<ResolversTypes['TeamResponse']>, ParentType, ContextType>;
  getUsers?: Resolver<Array<ResolversTypes['SubUser']>, ParentType, ContextType>;
  pendingRequestUsers?: Resolver<Array<ResolversTypes['PendingRequestUsersResponse']>, ParentType, ContextType>;
  retrieveUsersWithFriendRequestStatus?: Resolver<Array<ResolversTypes['SubUser']>, ParentType, ContextType>;
};

export type SubUserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SubUser'] = ResolversParentTypes['SubUser']> = {
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageCreated?: SubscriptionResolver<ResolversTypes['Message'], "messageCreated", ParentType, ContextType, RequireFields<SubscriptionMessageCreatedArgs, 'channelId'>>;
  newDirectMessage?: SubscriptionResolver<ResolversTypes['DirectMessage'], "newDirectMessage", ParentType, ContextType>;
};

export type TeamResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  defaultChannelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teamMembers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  teamName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamOwner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TeamResponse'] = ResolversParentTypes['TeamResponse']> = {
  defaultChannelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teamName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamWithRequstTypeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TeamWithRequstType'] = ResolversParentTypes['TeamWithRequstType']> = {
  requestStatus?: Resolver<ResolversTypes['RequestStatus'], ParentType, ContextType>;
  team?: Resolver<ResolversTypes['TeamResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersRequestRelationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UsersRequestRelation'] = ResolversParentTypes['UsersRequestRelation']> = {
  requestType?: Resolver<ResolversTypes['RequestType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['SubUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  AuthError?: AuthErrorResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  ChannelError?: ChannelErrorResolvers<ContextType>;
  ChannelList?: ChannelListResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DirectMessage?: DirectMessageResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  GetChannelsResponse?: GetChannelsResponseResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageResponse?: MessageResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PendingRequestUsersResponse?: PendingRequestUsersResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SubUser?: SubUserResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamResponse?: TeamResponseResolvers<ContextType>;
  TeamWithRequstType?: TeamWithRequstTypeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersRequestRelation?: UsersRequestRelationResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MyContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
