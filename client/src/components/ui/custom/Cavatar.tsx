import React, { HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { cn } from "@/lib/utils";
import { DiscordIcon } from "../icons";

interface CAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  userImage?: string;
  fallbackClassName?: string;
}

const CAvatar = ({ userImage, fallbackClassName, ...props }: CAvatarProps) => {
  return (
    <Avatar className="w-11 h-11" {...props}>
      <AvatarImage src={userImage} />
      <AvatarFallback
        className={cn(
          ` flex items-center justify-center bg-[#303339]  `,
          fallbackClassName
        )}
      >
        <DiscordIcon className="w-6 mt-1" />
      </AvatarFallback>
    </Avatar>
  );
};

export default CAvatar;
