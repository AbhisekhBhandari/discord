import React from "react";
import { GraphQLClient, ResponseMiddleware } from "graphql-request";

export default function useRequest() {
  let token = "";
  let refreshToken = "";
  const responseMiddleware: ResponseMiddleware = (response: any) => {
    
    const newToken = response.headers.get("x-token");
    const newRefreshToken = response.headers.get("x-refresh-token");

    if (newToken && newRefreshToken) {
      window.localStorage.setItem("token", newToken);
      window.localStorage.setItem("refresh-token", newRefreshToken);
    }
  };
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token") || "";
    refreshToken = window.localStorage.getItem("refresh-token") || "";
  }

  const client = React.useMemo(() => {
    return new GraphQLClient("http://localhost:4000/graphql", {
      responseMiddleware,
      headers: {
        "x-token": token,
        "x-refresh-token": refreshToken,
      },
    });
  }, []);

  return client;
}

// const responseMiddleware: ResponseMiddleware = (response) => {
//   const token = response.headers.get("x-token");
//   const refreshToken = response.headers.get("x-refresh-token");

//   if (token && refreshToken) {
//     console.log("set");
//     localStorage.setItem("token", token);
//     localStorage.setItem("refresh-token", refreshToken);
//   }
// };
// let token = "";
// let refreshToken = "";
// if (typeof window !== "undefined") {
//   token = window.localStorage.getItem("token") || "";
//   refreshToken = window.localStorage.getItem("refresh-token") || "";
// }

// export const client = new GraphQLClient("http://localhost:4000/graphql", {
//   responseMiddleware,
//   headers: {
//     "x-token": token,
//     "x-refresh-token": refreshToken,
//   },
// });
