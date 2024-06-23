import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddIcon, DiscordIcon, MicMuted } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import CAvatar from "@/components/ui/custom/Cavatar";
import { MicIcon } from "lucide-react";
import Link from "next/link";

function MeChannelUsers() {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex py-1 items-center justify-between px-5 font-medium text-sm tracking-wider">
        <p>DIRECT MESSAGES</p>
        <AddIcon className="w-4" />
      </div>
      <div className="flex flex-col gap-2 px-2 ">
        <MeChanneUserStruct
          username="Hero"
          userImage="https://github.com/shadcn.png"
          userId="1"
        />
        <MeChanneUserStruct username="Naruto" userId="2" />
        <MeChanneUserStruct username="Kakashi" userId="3" />
      </div>
    </div>
  );
}

export default MeChannelUsers;

function MeChanneUserStruct({
  userImage,
  username,
  userId,
}: {
  userImage?: string;
  username: string;
  userId: string;
}) {
  return (
    <Link
      href={`/me/${userId}`}
      className="flex items-center hover:bg-foreground/10 rounded-md px-3 py-1 gap-3 cursor-pointer text-lg font-medium  hover:text-white "
    >
      <CAvatar userImage={userImage} />
      <p> {username}</p>
    </Link>
  );
}
