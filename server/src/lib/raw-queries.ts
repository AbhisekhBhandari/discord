import { Prisma } from "@prisma/client";

export const getAddFriendUsers = (requestingUser: string) => Prisma.sql`
SELECT 
  u."userId", 
  u."username",
  u."profileImage",
  CASE
    WHEN fr."requestStatus" = 'REJECTED' THEN 'NONE'
    WHEN fr."senderId" = ${requestingUser}  THEN 'SENT'
    WHEN fr."receiverId" = ${requestingUser} THEN 'RECEIVED'
    ELSE 'NONE'
  END AS "requestType"
FROM 
  "User" u
LEFT JOIN (
  SELECT "senderId", "receiverId", "requestStatus" FROM "FriendRequest"
  WHERE "senderId" = ${requestingUser} OR "receiverId" = ${requestingUser}
) fr ON (u."userId" = fr."senderId" OR u."userId" = fr."receiverId")
WHERE 
  u."userId" != ${requestingUser}
  AND u."userId" NOT IN (
    SELECT "friend1Id" FROM "Friendship" WHERE "friend2Id" = ${requestingUser}
    UNION
    SELECT "friend2Id" FROM "Friendship" WHERE "friend1Id" = ${requestingUser}
  )
GROUP BY 
  u."userId", 
  fr."senderId",
  fr."requestStatus",
  fr."receiverId";`;
