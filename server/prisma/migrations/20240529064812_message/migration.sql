-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;
