"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CAvatar from "@/components/ui/custom/Cavatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SubUser } from "@/gql/types";
import { customFetcher } from "@/lib/server/request";
import { useInviteToTeam } from "@/query-hooks/team";
import { useGetTeamInviteUsers } from "@/query-hooks/user";
import Image from "next/image";
import Spinner from "@/assets/Spinner.gif";
import React from "react";

function InviteDialog({ teamId }: { teamId: string }) {

  const { data, isLoading } = useGetTeamInviteUsers(teamId);

  return (
    <Dialog>
      <DialogTrigger>Invite Peoples</DialogTrigger>
      <DialogContent className="border-none px-0 pb-0  overflow-clip">
        <DialogHeader className=" border-b border-darker px-3 ">
          <DialogTitle className="text-white text-xl">
            Invite Peoples
          </DialogTitle>
          <div className=" pt-1  pb-3 ">
            <p># ChannelName</p>
            <div className="py-2">
              <Input
                placeholder="Find friends"
                className="outline-none h-9  rounded-sm   ring-0 placeholder:font-semibold bg-secondary border-none  focus-visible:ring-0"
              />
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-2 px-2 max-h-64 scroll-thin overflow-y-auto">
          {data?.getTeamInviteUsers.map((user) => (
            <InviteUserStruct key={user.userId} user={user} teamId={teamId} />
          ))}
        </div>
        <div className="flex flex-col gap-2 bg-muted px-3 py-5">
          <p className="capitalize text-sm font-semibold">
            Or send a server invite link to a friend
          </p>
          <div className="flex bg-darker items-center px-2 py-1 rounded-sm">
            <p className="w-full">https://discord.gg/DGMSH5cp</p>
            <Button className="bg-hoverBlue px-5 py-3" size={"sm"}>
              Copy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;

function InviteUserStruct({ user, teamId }: { user: SubUser; teamId: string }) {
  const { mutate, isPending } = useInviteToTeam(teamId);

  return (
    <div className="flex items-center justify-between hover:bg-foreground/15 px-2 group py-1 rounded-md cursor-pointer  ">
      <div className="flex items-center gap-3">
        <CAvatar
          className=""
          fallbackClassName="bg-red-800 "
          userImage={user.profileImage ?? undefined}
        />
        <p className="text-lg group-hover:text-white">{user.username}</p>
      </div>
      <Button
        variant={"outline"}
        size={"sm"}
        className=" border-green-500 px-5 rounded-sm text-white group-hover:bg-green-700 group-hover:text-white"
        onClick={() => mutate(user.userId)}
        disabled={isPending}
      >
        {isPending ? <Image src={Spinner} alt="spinner" /> : "Invite"}
      </Button>
    </div>
  );
}
