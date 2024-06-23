import { ChannelMessagaSubscriptionDocument } from "@/gql/types";
import { useWebScoketClient } from "@/lib/ws";
import { useQueryClient } from "@tanstack/react-query";

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

export function useWsMessage({
  selectedChannelId,
}: {
  selectedChannelId: string;
}) {
  const WSclient = useWebScoketClient();
  const queryClient = useQueryClient();
  const wsFunction = () => {
    const unsubscribe = WSclient.subscribe(
      {
        query: MESSAGE_SUB_QUERY,
        variables: { channelId: selectedChannelId },
      },
      {
        next: (data) => {
          console.log("prev");

          queryClient.setQueryData(["messages", selectedChannelId], (old) => {
            return {
              getMessages: [...old.getMessages, data.data.newChannelMessage],
            };
          });
        },
        error: (error) => {
          console.error("error", error);
        },
        complete: () => {
          console.log("no more greetings");
        },
      }
    );
    return () => {
      console.log("un sub");

      unsubscribe();
    };
  };
}
