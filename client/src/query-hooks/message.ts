import { useSelectedConfig } from "@/context/SelectedConfig";
import {
  CreateDirectMessageDocument,
  CreateMessageDocument,
  GetDirectMessagesDocument,
  GetMessagesDocument,
  GetMessagesQuery,
  Message,
} from "@/gql/types";
import { requestClient } from "@/lib/request";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetMessages = (
  channelId: string,
  messageCount: number,
  initialMessages: GetMessagesQuery
) => {
  return useQuery({
    queryKey: ["messages", channelId],
    queryFn: () =>
      requestClient.request(GetMessagesDocument, {
        channelId: channelId,
        messageCount,
      }),

    initialData: initialMessages,
  });
};

async function fetchChannelMessage({
  channelId,
  messageCount,
  pageParam,
}: {
  channelId: string;
  messageCount: number;
  pageParam: number;
}) {
  return requestClient.request(GetMessagesDocument, {
    channelId,
    messageCount,
    page: pageParam,
  });
}

async function fetchDirectMessage({
  channelId,
  messageCount,
  page,
}: {
  channelId: string;
  messageCount: number;
  page: number;
}) {
  return requestClient.request(GetDirectMessagesDocument, {
    otherUserId: channelId,
    messageCount,
    page,
    // messageCount
  });
}

export const useInfiniteGetMesssages = (
  channelId: string,
  messageCount: number,
  type: "channel" | "direct"
) => {
  // const document =
  //   type === "channel" ? GetMessagesDocument : GetDirectMessagesDocument;
  // const variables = type === "direct" ? {
  //   channelId:

  // }

  return useInfiniteQuery({
    queryKey: ["messages", channelId],
    queryFn: async ({ pageParam }) => {
      // console.log("direcct maes", channelId, messageCount, pageParam);
      if (type === "channel")
        return await fetchChannelMessage({
          channelId,
          messageCount,
          pageParam,
        });
      const directMessage = await fetchDirectMessage({
        channelId,
        messageCount,
        page: pageParam,
      });

      return {
        getMessages: { messages: [...directMessage.getDirectMessages] },
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      let count = 0;

      pages.map((message) => {
        // console.log(",mess", message);

        count = count + message.getMessages.messages.length;
      });

      if (lastPage.getMessages.messages.length < 10) {
        return undefined;
      }
      // console.log("count", count);

      return count;
    },
  });
};

export const useCreateMessage = (channelId: string) => {
  return useMutation({
    mutationFn: (message: string) =>
      requestClient.request(CreateMessageDocument, {
        input: { channelId, message: message },
      }),
  });
};

export const useCreateDirectMessage = (receiverId: string) => {
  return useMutation({
    mutationFn: (text: string) =>
      requestClient.request(CreateDirectMessageDocument, {
        receiverId,
        text,
      }),
  });
};
