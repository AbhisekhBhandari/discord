export interface TJwtUserPayload {
  userId: string;
  iat: number;
  exp: number;
}

export type RequestType = 'SENT' | 'RECEIVED' | 'NONE';

export interface RawQueryResult {
  userId: string;
  username: string;
  profileImage?:string
  requestType: "SENT" | "RECEIVED"  | "NONE"; // Will be 'SENT', 'RECEIVED', or 'NONE' as string values from SQL query
}

// (property) getUsersWithRelation: (parent: any, args: any, { userId, prisma }: {
//   userId: any;
//   prisma: any;
// }) => Promise<{
//   user: {
//       userId: string;
//       username: string;
//       profileImage: string | undefined;
//   };
//   requestType: "SENT" | "RECEIVED" | "NONE";
// }[]>