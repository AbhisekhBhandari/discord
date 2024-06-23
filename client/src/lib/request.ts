import { GraphQLClient } from "graphql-request";

export const requestClient = new GraphQLClient("http://localhost:4000", {
  credentials: "include",
});

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
// import { GraphQLClient, ResponseMiddleware } from "graphql-request";

// export const client = new GraphQLClient("http://localhost:4000/graphql", {
//   credentials: "include",
//   responseMiddleware,
//   headers: {
//     "x-token": token,
//     "x-refresh-token": refreshToken,
//   },
// });
