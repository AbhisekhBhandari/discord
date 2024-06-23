"use client";
import { useDimensions, useResponsive } from "@/hooks/useResponsive";
import { createContext, useContext, useState } from "react";

interface ChannelContextProviderProps {
  children: React.ReactNode;
}
interface ChannelContextProps {
  showChannel: boolean;
  showChannelToggle: () => void;
}

const ChannelViewContext = createContext<ChannelContextProps>({
  showChannel: false,
  showChannelToggle: () => {},
});

export const ChannelContextProvider = ({
  children,
}: ChannelContextProviderProps) => {
  const [showChannel, setShowChannel] = useState(false);
  const showChannelToggle = () => {
    const { width, height } = useDimensions();
    if (width > 768) return;
    setShowChannel(!showChannel);
  };
  return (
    <ChannelViewContext.Provider value={{ showChannel, showChannelToggle }}>
      {children}
    </ChannelViewContext.Provider>
  );
};

export function useChannelContext(): ChannelContextProps {
  return useContext(ChannelViewContext);
}
