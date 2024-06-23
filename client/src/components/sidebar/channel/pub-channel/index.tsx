"use client";
import React from "react";
import PubChannelHead from "./channel-head";
import AddChannelDialog from "./add-channel";
import { ChannelStruct } from "./channel-struct";
import { useGetChannels } from "@/query-hooks/channel";
import { HideSidebarMenu } from "@/components/sidebar/menu";
import { Team, TeamResponse } from "@/gql/types";

interface IPubChannels {
  selectedTeamId: string;
  selectedChannelId: string;
  isMobile: boolean;
}

function PubChannels({
  selectedTeamId,
  selectedChannelId,
  isMobile,
}: IPubChannels) {
  const { data, isLoading, error } = useGetChannels();

  if (isLoading) {
    return (
      <div className=" flex   flex-col relative   h-full bg-muted    ">
        <p>Loading</p>
      </div>
    );
  }
  if (error) return <p>Some error occured</p>;
  // const { data, error } = useGetChannels();

  return (
    <div className=" flex    flex-col relative   h-full bg-muted  shrink-0   ">
      <div className="flex w-full shadow-lg items-center">
        <PubChannelHead team={data?.team as TeamResponse} isMobile={false} />
        {isMobile && <HideSidebarMenu />}
      </div>
      {/* Public channesl */}
      <div className="my-3">
        <div className="flex  flex-col gap-2 ">
          <div className="flex items-center justify-between px-2 ">
            <p className="hover:text-white w-full">Text Channels</p>
            <AddChannelDialog team={data?.team as TeamResponse} />
          </div>
          <div className="space-y-1">
            {data?.channels.map((channel) => (
              <ChannelStruct
                teamId={selectedTeamId}
                channelId={channel.channelId}
                channelName={channel.channelName}
                key={channel.channelId}
                selectedChannelId={selectedChannelId}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PubChannels;
