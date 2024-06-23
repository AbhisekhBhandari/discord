/*
  Warnings:

  - The values [INVITE] on the enum `DirectMessageTypes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `inviteId` on the `DirectMessage` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DirectMessageTypes_new" AS ENUM ('TEXT', 'MEDIA');
ALTER TABLE "DirectMessage" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "DirectMessage" ALTER COLUMN "type" TYPE "DirectMessageTypes_new" USING ("type"::text::"DirectMessageTypes_new");
ALTER TYPE "DirectMessageTypes" RENAME TO "DirectMessageTypes_old";
ALTER TYPE "DirectMessageTypes_new" RENAME TO "DirectMessageTypes";
DROP TYPE "DirectMessageTypes_old";
ALTER TABLE "DirectMessage" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_inviteId_fkey";

-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "inviteId";
