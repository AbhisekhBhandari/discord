import React from "react";
import CAvatar from "@/components/ui/custom/Cavatar";
import { CTooltip } from "@/components/ui/tooltip";
import {
  CallIcon,
  MenuIcon,
  ShowProfileIcons,
  VideoCallIcon,
} from "@/components/ui/icons";
import { GetChannelDocument, GetUserDocument } from "@/gql/types";
import { ShowSidebarMenu } from "@/components/sidebar/menu";
import { customFetcher } from "@/lib/server/request";
import { ShowMembers } from "./show-members";

interface MessageHeadProps {
  id: string;
  type: "channel" | "direct";
}

export default async function MessageHead({ id, type }: MessageHeadProps) {
  return (
    <div className="h-16   shadow-lg flex items-center justify-between px-3 shrink-0">
      {type === "channel" ? (
        <MessageHeadChannel channelId={id} />
      ) : (
        <MessageHeadDirect otherUserId={id} />
      )}
    </div>
  );
}

async function MessageHeadChannel({ channelId }: { channelId: string }) {
  const channelDetail = await customFetcher(
    GetChannelDocument,
    {},
    { channelId }
  );
  return (
    <>
      <div className="flex items-center gap-3 text-xl font-semibold">
        <ShowSidebarMenu />
        {/* <CAvatar userImage="" fallbackClassName="bg-red-800" /> */}
        <p className="text-center">
          <span className="text-2xl">#</span>{" "}
          {channelDetail.getChannel?.channelName}
        </p>
      </div>
      <div className="flex gap-6 px-2">
        <CTooltip element={<CallIcon />} message="Call" hoverBG />
        <CTooltip element={<VideoCallIcon />} message="Video Call" hoverBG />
        <ShowMembers />
      </div>
    </>
  );
}

async function MessageHeadDirect({ otherUserId }: { otherUserId: string }) {
  const userDetail = await customFetcher(
    GetUserDocument,
    {},
    { userId: otherUserId }
  );
  return (
    <>
      <div className="flex w-full items-center gap-3 text-xl font-semibold">
        <ShowSidebarMenu />
        <CAvatar
          userImage={userDetail.getUser.profileImage ?? undefined}
          fallbackClassName="bg-red-800"
        />
        <p className="text-center">
          <span className="text-2xl">#</span> {userDetail.getUser.username}
        </p>
      </div>
      <div className="flex gap-6 px-2">
        <CTooltip element={<CallIcon />} message="Call" hoverBG />
        <CTooltip element={<VideoCallIcon />} message="Video Call" hoverBG />
        <CTooltip
          element={<ShowProfileIcons />}
          message="Show User Profile"
          hoverBG
        />
      </div>
    </>
  );
}
