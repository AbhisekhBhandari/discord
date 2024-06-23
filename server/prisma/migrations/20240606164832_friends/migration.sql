-- CreateTable
CREATE TABLE "FriendRequest" (
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("senderId","receiverId")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "friend1Id" TEXT NOT NULL,
    "friend2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("friend1Id","friend2Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_friend1Id_friend2Id_key" ON "Friendship"("friend1Id", "friend2Id");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friend1Id_fkey" FOREIGN KEY ("friend1Id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friend2Id_fkey" FOREIGN KEY ("friend2Id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
