"use client";
import React from "react";
import SingleTeamTab from "./components/single-team-tab";
import { DiscordIcon } from "../../ui/icons";
import { Separator } from "../../ui/separator";
import { GetUserTeamsQuery } from "@/gql/types";
import AddTeamDialog from "./components/add-team";

function Teambar({ teams }: { teams: GetUserTeamsQuery }) {
  return (
    <div className=" h-screen shrink-0 max-h-screen w-[100px] overflow-y-auto scroll-thin  bg-darker flex flex-col items-center pt-4 pb-3 ">
      <div className="w-full">
        <SingleTeamTab
          icon={<DiscordIcon />}
          teamName="Direct Message"
          isFunc={false}
          linkId="/me"
        />
      </div>
      <Separator className="w-3/4 bg-background mt-3 mb-4" />
      <div className="w-full flex flex-col h-[1000px]  gap-3  items-center   justify-between ">
        <div className=" w-full flex flex-col gap-3">
          {teams.getUserTeams.map((team) => (
            <SingleTeamTab
              key={team.teamId}
              teamName={team.teamName}
              teamImage={team.teamImage}
              isFunc={false}
              linkId={`/channels/${team.teamId}/${team.defaultChannelId}`}
            />
          ))}
        </div>
        <AddTeamDialog />
      </div>
    </div>
  );
}

export default Teambar;
