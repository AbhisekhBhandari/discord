"use client";
import { toast } from "@/components/ui/use-toast";
import {
  CreateTeamDocument,
  GetTeamDocument,
  GetUserTeamsDocument,
  InviteToTeamDocument,
  RespondTeamInviteDocument,
} from "@/gql/types";
import { requestClient } from "@/lib/request";
import {
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

interface TCreateMutationProps {
  teamName: string;
}

export function useCreateTeamMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TCreateMutationProps) => {
      return requestClient.request(CreateTeamDocument, {
        input: { teamName: data.teamName },
      });
    },
    onSuccess: () => {
      toast({ title: "Team Created" });
      // queryClient.invalidateQueries({ queryKey: ["teams"] });
      // revalidateTag("teams");
      router.refresh();
    },
    onError: (e) => {
      console.log("err", e);

      toast({ title: "Failed", variant: "destructive" });
    },
  });
}

export function useGetTeamsQuery() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const data = await requestClient.request(GetUserTeamsDocument);
      return data;
    },
  });
}
export function useGetTeam(teamId: string) {
  return useQuery({
    queryKey: ["team"],
    queryFn: async () =>
      await requestClient.request(GetTeamDocument, { teamId }),
  });
}

export function useInviteToTeam(teamId: string) {
  return useMutation({
    mutationFn: async (userToInviteId: string) =>
      requestClient.request(InviteToTeamDocument, { teamId, userToInviteId }),
    onSuccess: (data) => {
      toast({ title: "Invite Sent" });
    },
    onSettled: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: [teamId, "inviteUsers"] });
    },
  });
}

export function useRespondTeamInvite(teamId: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: async (isAccepted: boolean) =>
      requestClient.request(RespondTeamInviteDocument, { isAccepted, teamId }),
    onSuccess: async (data) => {
      if (!data.respondTeamInvite)
        return toast({ title: "Rejected", variant: "destructive" });
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["teamInvites"] });
      router.refresh();
    },
  });
}
