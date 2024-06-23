-- CreateTable
CREATE TABLE "Member" (
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("teamId","userId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamImage" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_teamId_key" ON "Member"("userId", "teamId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
