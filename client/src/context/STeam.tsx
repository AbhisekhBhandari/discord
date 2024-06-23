import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface SelectedTeamProviderProps {
  children: React.ReactNode;
}
interface ContextProps {
  selectedTeam: undefined | TSelectedTeam;
  handleTeamSelect: (selectedTeam: TSelectedTeam) => void;
}

export type TSelectedTeam = {
  teamId: string;
  teamName: string;
};

const SelectedTeam = createContext<ContextProps>({
  selectedTeam: undefined,
  handleTeamSelect: () => {},
});

export const SelectedTeamProvider = ({
  children,
}: SelectedTeamProviderProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TSelectedTeam>({
    teamId: "",
    teamName: "",
  });
  const handleTeamSelect = (selectedTeam: TSelectedTeam) => {
    setSelectedTeam(selectedTeam);
  };

  return (
    <SelectedTeam.Provider value={{ selectedTeam, handleTeamSelect }}>
      {children}
    </SelectedTeam.Provider>
  );
};

export function useTeamSelect() {
  return useContext(SelectedTeam);
}
