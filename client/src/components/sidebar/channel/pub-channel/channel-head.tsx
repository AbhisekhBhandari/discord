"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, LeaveIcon, SmileIcon } from "@/components/ui/icons";
import { TeamResponse } from "@/gql/types";
import InviteDialog from "./invite-dialog";

function PubChannelHead({
  team,
  isMobile,
}: {
  team: TeamResponse;
  isMobile: boolean;
}) {
  const [showStatusBar, setShowStatusBar] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-16 w-full  flex items-center justify-between px-3 hover:bg-foreground/5 cursor-pointer">
          <p className="text-xl font-semibold">{team?.teamName}</p>
          <ArrowDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={6}
        className="w-72 px-2 bg-darker border-none text-foreground select-none"
      >
        <DropdownMenuItem>Notifictaion Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InviteDialog teamId={team.teamId} />
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            App Directory
            <DropdownMenuShortcut>
              <SmileIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Notifictaion Settings</DropdownMenuItem>
          <DropdownMenuItem>Privacy Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit Server Profile </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setShowStatusBar((prev) => !prev);
          }}
        >
          Hide Muted Channels
          <DropdownMenuShortcut>
            <input
              type="checkbox"
              checked={showStatusBar}
              className="w-5 h-5"
              onChange={() => setShowStatusBar((prev) => !prev)}
            />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-700 focus:bg-rose-700 font-semibold focust:text-white">
          Leave Channel
          <DropdownMenuShortcut>
            <LeaveIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PubChannelHead;
