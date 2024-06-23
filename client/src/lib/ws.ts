import { createClient } from "graphql-ws";

export function useWebScoketClient() {
  let token = "";
  let refreshToken = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token") || "";
    refreshToken = window.localStorage.getItem("refresh-token") || "";
  }

  const WSclient = createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: {
      token: token,
      refreshToken: refreshToken,
    },
  });
  return WSclient;
}

