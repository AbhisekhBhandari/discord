'use client'

import { ChannelList, GetChannelsQuery, GetUserTeamsQuery } from "@/gql/types";
import { useGetTeam } from "@/query-hooks/team";
import {
  QueryObserver,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { channel } from "diagnostics_channel";
import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TSelectedConfigProviderProps {
  children: React.ReactNode;
}
interface TChannel {
  channelId: string;
  channelName: string;
}
interface TTeam {
  teamId: string;
  teamName: string;
}
interface TSelectedConfigContexet {
  channel: TChannel | null;
  team: TTeam | null;
  setChannel: Dispatch<SetStateAction<TChannel | null>>;
  setTeam: Dispatch<SetStateAction<TTeam | null>>;
}
const SelectedConfigContext = createContext({} as TSelectedConfigContexet);

export const SelectedConfigProvider = ({
  children,
}: TSelectedConfigProviderProps) => {
  const [channel, setChannel] = useState<TChannel | null>(null);
  const [team, setTeam] = useState<TTeam | null>(null);
  const navigate = useRouter();
  const tId = usePathname().split("/")[2];
  const cId = usePathname().split("/")[3];

  const queryClient = useQueryClient();
  // useEffect(() => {
  //   if (!tId) return;
  //   const getD = async () => {
  //     const data = (await queryClient.ensureQueryData({
  //       queryKey: ["channel", tId],
  //     })) as ChannelList;
  //     const general = data.channels.filter(
  //       (c) => c.channelName === "general"
  //     )[0];
  //     navigate.push(`/channels/${team?.teamId}/${general.channelId}`);
  //   };
  //   getD();
  // }, [team]);

  // useEffect(() => {
  //   if (!team && tId) {
  //     const getD = async () => {
  //       const data = (await queryClient.ensureQueryData({
  //         queryKey: ["teams"],
  //       })) as GetUserTeamsQuery;
  //       const team = data.getUserTeams.filter((t) => t.teamId == tId)[0];
  //       setTeam({
  //         teamId: team.teamId,
  //         teamName: team.teamName,
  //       });
  //     };
  //     getD();
  //   }
  // }, []);
  // useEffect(() => {
  //   if (!channel && cId) {
  //     const getD = async () => {
  //       const data = (await queryClient.ensureQueryData({
  //         queryKey: ["channel", tId],
  //       })) as ChannelList;
  //       const channel = data.channels.filter((c) => c.channelId == cId)[0];
  //       console.log(channel);

  //       setChannel({
  //         channelId: channel.channelId,
  //         channelName: channel.channelName,
  //       });
  //     };
  //     getD();
  //   }
  // }, []);

  return (
    <SelectedConfigContext.Provider
      value={{ channel, team, setChannel, setTeam }}
    >
      {children}
    </SelectedConfigContext.Provider>
  );
};

export function useSelectedConfig() {
  return useContext(SelectedConfigContext);
}
