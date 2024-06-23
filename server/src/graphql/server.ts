import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PrismaClient } from "@prisma/client";
import { Server } from "http";
import { handleTokens, makeSchema } from "../lib/utils";
import { MyContext } from "./context";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { prisma } from "../lib/prisma";
import { authDirective } from "./directive/auth";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export async function createGraphqlServer(httpServer: Server) {
  const schema = makeSchema();

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanUp = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        const request = ctx.extra.request;
        const cookieStore = request.headers.cookie;
        const parsed = cookie.parse(cookieStore || "");

        const token = parsed["token"];
        const refreshToken = parsed["refresh-token"];

        let userId = null;
        if (cookieStore) {
          const decoded = jwt.decode(refreshToken);
          userId = decoded?.userId ?? null;
        }

        return { prisma, userId };
      },
      // onConnect(ctx) {
      //   console.log("onConnect triggered");

      //   const request = ctx.extra.request;
      //   const cookie = request.headers.cookie;

      //   let userId = null;
      //   console.log("cook", cookie);

      //   if (cookie) {
      //     const token = cookie.split("=")[1];
      //     console.log("token", token);
      //     if (token) {
      //       const decoded = jwt.decode(token);
      //       console.log("req", decoded);
      //       userId = decoded?.userId ?? null;
      //     }
      //   }

      //   console.log("userId on connect:", userId);

      //   // if (!userId) {
      //   //   throw new Error("Authentication failed: userId not found");
      //   // }
      // },
    },
    wsServer
  );
  const server = new ApolloServer<MyContext>({
    schema: schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanUp.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  return server;
}
