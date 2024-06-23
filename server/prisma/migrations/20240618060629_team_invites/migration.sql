-- CreateEnum
CREATE TYPE "DirectMessageTypes" AS ENUM ('TEXT', 'INVITE', 'MEDIA');

-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN     "inviteId" TEXT,
ADD COLUMN     "type" "DirectMessageTypes" NOT NULL DEFAULT 'TEXT';

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "TeamInvites"("inviteId") ON DELETE SET NULL ON UPDATE CASCADE;
