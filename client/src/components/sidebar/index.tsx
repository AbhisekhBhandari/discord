import React from "react";
import Teambar from "./teambar";
import { customFetcher } from "@/lib/server/request";
import { GetUserTeamsDocument } from "@/gql/types";
import Channels from "./channel";
// import { getTeams } from "./Teambar/components/team-tabs";
import SidebarMob from "./sidebar-mob";

export async function getTeams() {
  const data = await customFetcher(GetUserTeamsDocument, {
    next: { tags: ["teams"] },
  });
  return data;
}

async function Sidebar() {
  const data = await getTeams();
  return (
    <div className="flex w-0  xl:w-[410px] overflow-clip h-full transition-all ease-in-out ">
      <Teambar teams={data} />
      <Channels isMobile={false} />

      <SidebarMob teams={data} />
    </div>
  );
}

export default Sidebar;
