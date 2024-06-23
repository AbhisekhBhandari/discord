/*
  Warnings:

  - You are about to drop the column `isAccepted` on the `FriendRequest` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestStatusType" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "isAccepted",
ADD COLUMN     "requestStatus" "RequestStatusType" NOT NULL DEFAULT 'PENDING';
