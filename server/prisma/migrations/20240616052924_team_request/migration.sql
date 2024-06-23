-- CreateTable
CREATE TABLE "TeamRequest" (
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestStatus" "FriendRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamRequest_pkey" PRIMARY KEY ("teamId","userId")
);

-- CreateIndex
CREATE INDEX "TeamRequest_teamId_idx" ON "TeamRequest"("teamId");

-- CreateIndex
CREATE INDEX "TeamRequest_userId_idx" ON "TeamRequest"("userId");

-- AddForeignKey
ALTER TABLE "TeamRequest" ADD CONSTRAINT "TeamRequest_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRequest" ADD CONSTRAINT "TeamRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
