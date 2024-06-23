/*
  Warnings:

  - You are about to drop the column `text` on the `DirectMessage` table. All the data in the column will be lost.
  - Added the required column `message` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "text",
ADD COLUMN     "message" TEXT NOT NULL;
