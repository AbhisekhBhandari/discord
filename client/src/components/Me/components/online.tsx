import { GetTeamInvitesDocument } from "@/gql/types";
import { requestClient } from "@/lib/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import CAvatar from "@/components/ui/custom/Cavatar";
import { Button } from "@/components/ui/button";
import {
  useFriendRequestRespond,
  useSendFriendRequest,
} from "@/query-hooks/user";
import { useRespondTeamInvite } from "@/query-hooks/team";

function AddFriend() {
  const { data, error } = useQuery({
    queryKey: ["teamInvites"],
    queryFn: () => requestClient.request(GetTeamInvitesDocument),
  });

  if (!data) return <div>Loading</div>;
  return (
    <div className="">
      {data.getTeamInvites.map(({ team, requestStatus }) => (
        <div
          className="flex custom-border items-center group  hover:bg-foreground/10 cursor-pointer px-3 py-2 rounded-lg justify-between"
          key={team.teamId}
        >
          <div className="flex gap-3 items-center">
            <CAvatar
              fallbackClassName="bg-red-800"
              userImage={team.teamImage ?? undefined}
            />
            <div className="text-lg">
              <p className="font-bold">{team.teamName}</p>
              {/* <p className="font-medium text-base ">Online</p> */}
            </div>
          </div>
          <div className="flex gap-3 items-center ">
            <AddFriendButton teamId={team.teamId} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddFriend;

function AddFriendButton({ teamId }: { teamId: string }) {
  const { mutate, isPending } = useRespondTeamInvite(teamId);
  return (
    <div className="flex gap-2 z-10">
      <Button onClick={() => mutate(true)}>Accept request</Button>
      <Button variant={"destructive"} onClick={() => mutate(false)}>
        Reject Request
      </Button>
    </div>
  );
}
