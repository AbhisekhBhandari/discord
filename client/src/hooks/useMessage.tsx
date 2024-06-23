import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useRequest from "./useRequest";
import {
  GET_MESSAGES,
  GET_PRIV_MESSAGES,
  SUBSCRIBE_DIRECT_MESSAGE,
  SUBSCRIBE_MESSAGE,
} from "@/lib/query";
import { useWebScoketClient } from "@/lib/ws";
import { ExecutionResult } from "graphql";
import { useState } from "react";

const SELF = "me";

export function useMessage() {
  const [re, setRe] = useState("");
  const searchParams = useSearchParams();
  const t = searchParams.get("t");
  const c = searchParams.get("c");
  const isPriv = t === SELF;
  const client = useRequest();
  const WSclient = useWebScoketClient();
  const queryClient = useQueryClient();

  const handleRe = (text: string) => {
    setRe(text);
  };
  const queryKey = isPriv
    ? ["messages", "priv", c]
    : ["messages", "channel", c];

  const channelQueryFn = ({ pageParam }) => {
    return client.request(GET_MESSAGES, { channelId: c, skip: pageParam });
  };
  const privQueryFn = () =>
    client.request(GET_PRIV_MESSAGES, { otherUserId: c });

  const useMessageQuery = (skip = 0) => {
    return useQuery({
      queryKey,
      queryFn: () => {
        if (isPriv) {
          return privQueryFn(skip);
        } else {
          return channelQueryFn(skip);
        }
      },

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });
  };
  const useMessageInfiniteQuery = () => {
    return useInfiniteQuery({
      queryKey,
      queryFn: isPriv ? privQueryFn : channelQueryFn,
      initialPageParam: 0,
      select: (data) => {
        console.log("dataaa", data);
        return {
          pages: [...data.pages].reverse(),
        };
      },
      getNextPageParam: (lastPage, allPage) => {
        let count = 0;
        allPage.map((message) => {
          const messagesCount = isPriv
            ? message.getPrivMessages.length
            : message.getMessages.length;
          count = count + messagesCount;
        });
        const pagesLength = allPage.length;
        console.log("pageLength", pagesLength);

        // const lastPageLength = allPage[]
        const lastChunkLength = isPriv
          ? allPage[pagesLength - 1].getPrivMessages.length
          : allPage[pagesLength - 1].getMessages.length;

        if (lastChunkLength < 10) {
          return undefined;
        }
        return count;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });
  };

  const wsConfig = {
    query: isPriv ? SUBSCRIBE_DIRECT_MESSAGE : SUBSCRIBE_MESSAGE,
    variables: isPriv ? undefined : { channelId: c },
  };

  function channelResponseHandler(
    data: ExecutionResult<Record<string, unknown>, unknown>
  ) {
    queryClient.setQueryData(["messages", "channel", c], (old) => {
      // console.log("no ", old.pages);

      const newData = { ...old };
      newData.pages[0].getMessages = [
        ...newData.pages[0].getMessages,
        data.data.newChannelMessage,
      ];
      // console.log("update ", newData.pages);
      handleRe(data.data.newChannelMessage.text);

      //  old.pages[0] = [...old.pages, data.data.newChannelMessage];
      return newData;
    });
  }
  function directResponseHandler(
    data: ExecutionResult<Record<string, unknown>, unknown>
  ) {
    queryClient.setQueryData(["messages", "priv", c], (old) => {
      const newData = { ...old };
      newData.pages[0].getPrivMessages = [
        ...newData.pages[0].getPrivMessages,
        data.data.newPrivMessage,
      ];

      handleRe(data.data.newPrivMessage.text);

      return newData;
    });
  }

  const wsFunction = () => {
    const unsubscribe = WSclient.subscribe(wsConfig, {
      next: isPriv ? directResponseHandler : channelResponseHandler,

      error: (error) => {
        console.error("error", error);
      },
      complete: () => {
        console.log("no more greetings");
      },
    });
    return unsubscribe;
  };

  return { useMessageQuery, wsFunction, useMessageInfiniteQuery };
}
