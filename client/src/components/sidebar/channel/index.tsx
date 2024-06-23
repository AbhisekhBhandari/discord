"use client";
import React, { HTMLAttributes } from "react";
import MeChannel from "./me-channel";
import UserTab from "./components/user-tab";
import PubChannels from "./pub-channel";
import { usePathName } from "@/hooks/newH/usePathname";

interface ChannelProps extends HTMLAttributes<HTMLDivElement> {
  isMobile: boolean;
}

const Channels = ({ isMobile }: ChannelProps) => {
  const path = usePathName();
  return (
    <div className={`flex  flex-col relative   h-full w-full    `}>
      {path[1] === "me" ? (
        <MeChannel isMobile={isMobile} />
      ) : (
        <PubChannels
          selectedTeamId={path[2]}
          selectedChannelId={path[3]}
          isMobile={isMobile}
        />
      )}

      <UserTab />
    </div>
  );
};

export default Channels;
