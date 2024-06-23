import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CAvatar from "@/components/ui/custom/Cavatar";
import { ChatIcon, Vertical3Dots } from "@/components/ui/icons";
import { SearchInput } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { customFetcher } from "@/lib/server/request";
import { useGetFriends } from "@/query-hooks/user";
import Link from "next/link";
import React from "react";

interface OnlineUserStructProps {
  userId: string;
  username: string;
  userImage?: string;
}

function All() {
  // const friends = await customFetcher(GetFriend)
  const { data, isLoading } = useGetFriends();
  if (isLoading) return <p>Loading</p>;
  return (
    <div className="flex flex-col px-6 gap-2">
      <p className="py-2 pt-4 text-sm font-semibold  tracking-wider">
        ALL FRIENDS - {data?.getFriends.length}
      </p>
      <Separator className="bg-foreground w-full " />
      <div>
        {data?.getFriends.map((friend) => (
          <AllUserStruct
            key={friend.userId}
            username={friend.username}
            userId={friend.userId}
            userImage={friend.profileImage ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default All;

export function AllUserStruct({
  userId,
  username,
  userImage,
}: OnlineUserStructProps) {
  return (
    <div className="flex items-center group hover:bg-foreground/10 cursor-pointer px-3 py-2 rounded-lg justify-between">
      <div className="flex gap-3 items-center">
        <CAvatar fallbackClassName="bg-red-800" userImage={userImage} />
        <div className="text-lg">
          <p className="font-bold">{username}</p>
          <p className="font-medium text-base ">Online</p>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <Link href={`/me/${userId}`}>
          <ChatIcon className="hover:text-white" />
        </Link>
        <Vertical3Dots className="hover:text-white" />
      </div>
    </div>
  );
}
