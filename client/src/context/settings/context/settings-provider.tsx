"use client";

import { useState } from "react";
import { SettingsContext } from "./settings-context";

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [isMicOpen, setIsMicOpen] = useState(true);
  const [isDefened, setIsDeafend] = useState(false);

  const toggleMic = () => {
    setIsMicOpen((prev) => !prev);
  };
  const toggleDeafen = () => {
    setIsDeafend((prev) => !prev);
  };

  const values = {
    isMicOpen,
    toggleMic,
    isDefened,
    toggleDeafen,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
}
