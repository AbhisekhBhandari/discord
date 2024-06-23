import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CAvatar from "@/components/ui/custom/Cavatar";
import { ChatIcon, Vertical3Dots } from "@/components/ui/icons";
import { SearchInput } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useFriendRequestRespond,
  usePendingRequestUsers,
} from "@/query-hooks/user";
import {
  PendingRequestUsersQuery,
  PendingRequestUsersResponse,
} from "@/gql/types";
import { Button } from "@/components/ui/button";

interface OnlineUserStructProps {
  pendingRequest: PendingRequestUsersResponse;
}

function Pending() {
  const { data, isLoading, error } = usePendingRequestUsers();
  console.log("pending", data, error);

  return (
    <div className="flex flex-col px-6 gap-2">
      {/* <SearchInput placeholder="Search" /> */}
      <p className="py-2 pt-4 text-sm font-semibold  tracking-wider">
        Pending - 20
      </p>
      <Separator className="bg-foreground w-full " />
      <div>
        {data?.pendingRequestUsers.map((pendingReq) => (
          <OnlineUserStruct
            pendingRequest={pendingReq}
            key={pendingReq.user.userId}
          />
        ))}
      </div>
    </div>
  );
}

export default Pending;
function OnlineUserStruct({
  pendingRequest: { user, requestDirection },
}: OnlineUserStructProps) {
  return (
    <div className="flex items-center group hover:bg-foreground/10 cursor-pointer px-3 py-2 rounded-lg justify-between">
      <div className="flex gap-3 items-center">
        <CAvatar
          fallbackClassName="bg-red-800"
          userImage={user.profileImage ?? undefined}
        />
        <div className="text-lg">
          <p className="font-bold">{user.username}</p>
          <p className="font-medium text-base ">Online</p>
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <AddFriendButton
          receiverId={user.userId}
          requestType={requestDirection}
        />
      </div>
    </div>
  );
}

function AddFriendButton({
  receiverId,
  requestType,
}: {
  receiverId: string;
  requestType: "SENT" | "RECEIVED";
}) {
  // const { mutate: sendRequestMutate, isPending: sendRequestPending } =
  //   useSendFriendRequest();
  const { mutate: respondRequestMutate, isPending: respondRequestPending } =
    useFriendRequestRespond(receiverId);

  if (requestType === "SENT") {
    return (
      <Button className="z-10" disabled={true}>
        Request Sent
      </Button>
    );
  }
  if (requestType === "RECEIVED") {
    return (
      <div className="flex gap-2 z-10">
        <Button onClick={() => respondRequestMutate(true)}>
          Accept request
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => respondRequestMutate(false)}
        >
          Reject Request
        </Button>
      </div>
    );
  }
}
