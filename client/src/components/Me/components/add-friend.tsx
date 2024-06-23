import { RetrieveUsersWithFriendRequestStatusDocument } from "@/gql/types";
import { requestClient } from "@/lib/request";
import {useQuery } from "@tanstack/react-query";
import React from "react";
import CAvatar from "@/components/ui/custom/Cavatar";
import { Button } from "@/components/ui/button";
import {
  useFriendRequestRespond,
  useSendFriendRequest,
} from "@/query-hooks/user";

function AddFriend() {
  const { data } = useQuery({
    queryKey: ["addFriends"],
    queryFn: () =>
      requestClient.request(RetrieveUsersWithFriendRequestStatusDocument),
  });

  console.log("yp", data);

  if (!data) return <div>Loading</div>;
  return (
    <div className="">
      {data.retrieveUsersWithFriendRequestStatus.map((user) => (
        <div
          className="flex custom-border items-center group  hover:bg-foreground/10 cursor-pointer px-3 py-2 rounded-lg justify-between"
          key={user.userId}
        >
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
            <AddFriendButton receiverId={user.userId} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddFriend;

function AddFriendButton({ receiverId }: { receiverId: string }) {
  const { mutate: sendRequestMutate, isPending: sendRequestPending } =
    useSendFriendRequest();
  const { mutate: respondRequestMutate, isPending: respondRequestPending } =
    useFriendRequestRespond(receiverId);

  return (
    <Button
      className="z-10"
      onClick={() => {
        sendRequestMutate(receiverId);
      }}
      disabled={sendRequestPending}
    >
      Add Friend
    </Button>
  );
}
// if (requestType === "SENT") {
//   return (
//     <Button className="z-10" disabled={true}>
//       Request Sent
//     </Button>
//   );
// }
// if (requestType === "RECEIVED") {
//   return (
//     <div className="flex gap-2 z-10">
//       <Button onClick={() => respondRequestMutate(true)}>
//         Accept request
//       </Button>
//       <Button
//         variant={"destructive"}
//         onClick={() => respondRequestMutate(false)}
//       >
//         Reject Request
//       </Button>
//     </div>
//   );
// }
// }
