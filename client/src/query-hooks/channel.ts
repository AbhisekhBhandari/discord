"use client";
import { toast } from "@/components/ui/use-toast";
import {
  ChannelList,
  CreateChannelDocument,
  CreateChannelInput,
  GetChannelsDocument,
} from "@/gql/types";
import { requestClient } from "@/lib/request";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export function useCreateChannel(teamId: string, handleClose: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["channnel", teamId],
    mutationFn: async ({ channelName }: { channelName: string }) =>
      await requestClient.request(CreateChannelDocument, {
        input: { channelName, teamId: teamId },
      }),
    onSuccess: (data) => {
      if (data.createChannel == false) throw Error;
      toast({ title: "Created Channel Successfully" });
      queryClient.invalidateQueries({ queryKey: ["channel", teamId] });
      handleClose();
    },
    onError: (error) => {
      console.log("error", error);

      toast({ title: "Failed to create Channel" });
    },
  });
}

export function useGetChannels() {
  const teamId = usePathname().split("/")[2];

  return useQuery({
    queryKey: ["channel", teamId],
    queryFn: async () => {
      const data = await requestClient.request(GetChannelsDocument, { teamId });

      if (data.getChannels.__typename === "ChannelList") {
        return data.getChannels as ChannelList;
      }
      throw new Error("Failed to Fetch Chnanels");
    },
  });
}
