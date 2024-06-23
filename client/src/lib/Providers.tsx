"use client";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SelectedTeamProvider } from "@/context/STeam";

function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SelectedTeamProvider>{children}</SelectedTeamProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;
