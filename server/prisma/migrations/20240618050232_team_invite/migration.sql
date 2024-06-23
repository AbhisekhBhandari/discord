-- CreateTable
CREATE TABLE "TeamInvites" (
    "inviteId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "maxUsage" INTEGER NOT NULL DEFAULT 1,
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamInvites_pkey" PRIMARY KEY ("inviteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamInvites_code_key" ON "TeamInvites"("code");

-- AddForeignKey
ALTER TABLE "TeamInvites" ADD CONSTRAINT "TeamInvites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvites" ADD CONSTRAINT "TeamInvites_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
