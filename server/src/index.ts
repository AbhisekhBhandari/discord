import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import { createGraphqlServer } from "./graphql/server";

import { contextFunc } from "./graphql/context";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

import { handleTokens, setTokens } from "./lib/utils";
dotenv.config();

async function init() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = await createGraphqlServer(httpServer);
  app.use(
    cookieParser(),
    cors<cors.CorsRequest>({
      credentials: true,
      origin: "http://localhost:3000",
    }),
    express.json()
  );
  app.use(handleTokens);

  app.use(
    expressMiddleware(server, {
      context: contextFunc,
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

init();
