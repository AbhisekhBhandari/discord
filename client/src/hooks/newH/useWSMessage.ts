import { GetMessagesQuery } from "@/gql/types";
import { useWebScoketClient } from "@/lib/ws";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IWSConfig {
  query: string;
  variables?: {
    channelId: string;
  };
}

const MESSAGE_SUB_QUERY = `
subscription Subscription($channelId: String!) {
  messageCreated(channelId: $channelId) {
    message
    messageId
    createdAt
    sender {
      profileImage
      userId
      username
    }
  }
}
`;

const DIRECT_MESSAGE_QUERY = `subscription DirectMessageSubscription {
  newDirectMessage {
    sender {
      userId
      username
      profileImage
    }
    messageId
    message
    createdAt
  }
}`;

export function useWSMessage({
  selectedChannelId,
  type,
}: {
  selectedChannelId: string;
  type: "channel" | "direct";
}) {
  const [latestMessageId, setLatestMessageId] = useState("");

  const queryClient = useQueryClient();

  function channelSubscriptionHandler({ data }) {

    queryClient.setQueryData(
      ["messages", selectedChannelId],

      (oldData) => {
        const newData = { ...oldData };
        if (type === "channel") {
          newData.pages[0].getMessages.messages = [
            data.messageCreated,
            ...newData.pages[0].getMessages.messages,
          ];
          setLatestMessageId(data.messageCreated.messageId);
        } else {
          newData.pages[0].getMessages.messages = [
            data.newDirectMessage,
            ...newData.pages[0].getMessages.messages,
          ];
          setLatestMessageId(data.newDirectMessage.messageId);
        }

        return newData;
      }
    );
  }

  // function directSuscriptionHandler(data) {
  //   console.log("direct Message", data);

  //   // queryClient.setQueryData(
  //   //   ["messages", selectedChannelId],

  //   //   (oldData) => {
  //   //     const newData = { ...oldData };

  //   //     newData.pages[0].getMessages.messages = [
  //   //       data.messageCreated,
  //   //       ...newData.pages[0].getMessages.messages,
  //   //     ];

  //   //     setLatestMessageId(data.messageCreated.messageId);

  //   //     return newData;

  //   //   }
  //   // );
  // }

  const WSclient = useWebScoketClient();
  let WSConfig: IWSConfig = {
    query: MESSAGE_SUB_QUERY,
    variables: { channelId: selectedChannelId },
  };
  if (type === "direct") {
    WSConfig = {
      query: DIRECT_MESSAGE_QUERY,
    };
  }

  const wsFunction = () => {
    const unsubscribe = WSclient.subscribe(WSConfig, {
      next:
        // type === "channel"
        // ?
        channelSubscriptionHandler,
      // : directSuscriptionHandler,

      error: (error) => {
        console.error("error", error);
      },
      complete: () => {
        console.log("no more greetings");
      },
    });
    return unsubscribe;
  };
  return { wsFunction };
}
