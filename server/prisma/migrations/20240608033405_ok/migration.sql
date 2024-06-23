/*
  Warnings:

  - You are about to drop the column `requestStatus` on the `FriendRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "requestStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "RequestStatusType";
