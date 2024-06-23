"use client";
import React, { useEffect } from "react";
import CAvatar from "@/components/ui/custom/Cavatar";
import { useInfiniteGetMesssages } from "@/query-hooks/message";
import { DirectMessage, Message } from "@/gql/types";
import { useWSMessage } from "@/hooks/newH/useWSMessage";
import { Button } from "@/components/ui/button";

interface IMessageBodyProps {
  id: string;
  type: "channel" | "direct";
}

function extractMessages<T extends Message | DirectMessage>(
  data: any,
  type: "channel" | "direct"
): T[] {
  let messages: T[] = [];

  data?.pages.forEach((page: any) => {
    messages = [...messages, ...(page.getMessages.messages as T[])];
  });

  return messages;
}

export default function MessageBody({ id, type }: IMessageBodyProps) {
  const { wsFunction } = useWSMessage({ selectedChannelId: id, type });

  useEffect(() => {
    const unsubscribe = wsFunction();
    return () => unsubscribe();
  }, [id]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteGetMesssages(
    id,
    10,
    type
  );

  const messages = extractMessages<DirectMessage>(data, type);

  if (!data && !messages) return <p>Loading...</p>;
  return (
    <div className=" flex flex-col flex-grow h-full    overflow-auto    mx-1 my-2">
      <div className="flex gap-4 h-full overflow-auto scroll-thin  w-full flex-col-reverse px-5 py-5   ">
        <div className="flex gap-4 flex-col-reverse">
          {messages.map((me) => {
            return <MessageStruct message={me} key={me.messageId} />;
          })}
        </div>
        {hasNextPage && (
          <Button className=" mx-auto" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
}

const MessageStruct = ({ message }: { message: Message | DirectMessage }) => {
  return (
    <div className="flex gap-5  ">
      <CAvatar userImage="" fallbackClassName="bg-red-800 " />
      <div className="flex flex-col">
        <div className="flex gap-4 items-center">
          <p className="text-xl font-semibold text-white">
            {message.sender.username}
          </p>
          <p className="text-sm">{message.createdAt}</p>
        </div>
        <div className="messages text-lg">
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
};

// const PendingMessageStruct = ({
//   message,
//   selectedChannelId,
// }: {
//   message: Message;
//   selectedChannelId: string;
// }) => {
//   const [pendingMessage, setPendingMessage] = useState("");

//   const variables = useMutationState({
//     filters: {
//       mutationKey: ["addMessage", selectedChannelId],
//       status: "pending",
//     },
//     select(mutation) {
//       console.log("mutation", mutation.state.variables);
//       setPendingMessage(mutation.state.variables as string);
//     },
//   });

//   if (!pendingMessage) return;
//   return (
//     <div className="flex gap-5  ">
//       <CAvatar userImage="" fallbackClassName="bg-red-800 " />
//       <div className="flex flex-col">
//         <div className="flex gap-4 items-center">
//           <p className="text-xl font-semibold text-white">
//             {/* {message.sender.username} */}
//             Pending user
//           </p>
//           <p className="text-sm">dummy</p>
//         </div>
//         <div className="messages text-lg">
//           <p>{pendingMessage}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
