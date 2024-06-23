"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext({} as SidebarContextProps);

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowsidebar] = useState(false);

  const toggleSidebar = () => setShowsidebar((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
