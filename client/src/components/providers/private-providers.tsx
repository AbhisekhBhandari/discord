"use client";
import React from "react";
import { SettingsProvider } from "../../context/settings/context/settings-provider";
import { ChannelContextProvider } from "@/context/channelView";
import { SidebarContextProvider } from "@/context/sidebarContext";
import { AuthContextProvider } from "@/context/auth";
import Authgurad from "../auth/guard/auth-guard";

function PrivProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
        <SettingsProvider>
          <ChannelContextProvider>
            <SidebarContextProvider>
              <Authgurad>

              {children}
              </  Authgurad>
              </SidebarContextProvider>
          </ChannelContextProvider>
        </SettingsProvider>
    </AuthContextProvider>
  );
}

export default PrivProviders;
