-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateTable
CREATE TABLE "Channel" (
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "channelType" "ChannelType" NOT NULL DEFAULT 'PUBLIC',
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("channelId")
);

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;
