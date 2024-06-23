import { toast } from "@/components/ui/use-toast";
import {
  FriendRequestRespondDocument,
  FriendRequestSendDocument,
  GetFriendsDocument,
  GetTeamInviteUsersDocument,
  GetTeamUsersDocument,
  GetUserDocument,
  LogoutDocument,
  PendingRequestUsersDocument,
} from "@/gql/types";
import { requestClient } from "@/lib/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useGetUser(userId?: string) {
  return useQuery({
    queryKey: userId ? ["user", userId] : ["user"],
    queryFn: async () =>
      await requestClient.request(GetUserDocument, { userId }),
  });
}

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (receiverId: string) => {
      return requestClient.request(FriendRequestSendDocument, {
        receiverId,
      });
    },
    onSuccess: (data) => toast({ title: "sent" }),
    onError: (error) => {
      console.log("err", error);

      toast({ title: "not sent" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["addFriends"] });
    },
  });
}

export function useFriendRequestRespond(senderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isAccepted: boolean) => {
      return requestClient.request(FriendRequestRespondDocument, {
        isAccepted,
        senderId,
      });
    },
    onSuccess: (data: any) => {
      if (data.friendRequestRespond.valueOf()) {
        return toast({ title: "Friend Added" });
      }
      return toast({
        title: "Friend Request Rejected",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["addFriends"] });
    },
  });
}

export function useGetFriends() {
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => requestClient.request(GetFriendsDocument),
  });
}

export function useGetTeamUsers(teamId: string) {
  return useQuery({
    queryKey: [teamId, "users"],
    queryFn: async () =>
      await requestClient.request(GetTeamUsersDocument, { teamId }),
  });
}

export function useGetTeamInviteUsers(teamId: string) {
  return useQuery({
    queryKey: [teamId, "inviteUsers"],
    queryFn: async () =>
      await requestClient.request(GetTeamInviteUsersDocument, { teamId }),
  });
}

export function usePendingRequestUsers() {
  return useQuery({
    queryKey: ["pendingRequest"],
    queryFn: async () =>
      await requestClient.request(PendingRequestUsersDocument),
  });
}

export function useLogout() {
  const naviagate = useRouter();
  return useMutation({
    mutationFn: async () => await requestClient.request(LogoutDocument),
    onSuccess: (data) => {
      console.log("data", data);

      if (data.logout) {
        console.log("in here");

        toast({ title: "Logged Out successfully" });
        naviagate.push('/login')
      } else {
        toast({ title: "Logout failed", variant: "destructive" });
      }
    },
  });
}
