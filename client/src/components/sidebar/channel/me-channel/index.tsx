import React from "react";
import { Input } from "@/components/ui/input";
import MeChannelOptions from "./me-channel-options";
import MeChannelUsers from "./me-channel-users";
import { HideSidebarMenu } from "../../menu";

function MeChannel({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="flex flex-col flex-grow justify-between   select-none   gap-3  md:flex w-full    relative   h-full bg-muted  shrink-0">
      <div>
        <div className="flex items-center  py-4 px-4  h-16    shadow-black  shadow-[0_3px_20px_-10px_rgba(0,0,0,0.2)]">
          <Input
            placeholder="Find or start a conversation"
            className="outline-none h-9  ring-0 placeholder:font-semibold bg-secondary border-none  focus-visible:ring-0"
          />
          {isMobile && <HideSidebarMenu />}
        </div>
        <MeChannelOptions />
        <MeChannelUsers />
      </div>
    </div>
  );
}

export default MeChannel;
