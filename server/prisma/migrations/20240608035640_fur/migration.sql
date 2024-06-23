-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "FriendRequest" ADD COLUMN     "requestStatus" "FriendRequestStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "FriendRequest_senderId_idx" ON "FriendRequest"("senderId");

-- CreateIndex
CREATE INDEX "FriendRequest_receiverId_idx" ON "FriendRequest"("receiverId");
