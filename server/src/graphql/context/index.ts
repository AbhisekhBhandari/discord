import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { prisma } from "../../lib/prisma";
import { PrismaClient } from "@prisma/client";
import { type Response, type Request } from "express";

export interface MyContext {
  token?: string;
  prisma: PrismaClient;
  res: Response;
  userId?: string;
  req: Request;
}

export const contextFunc: ContextFunction<
  [ExpressContextFunctionArgument],
  MyContext
> = async ({ req, res }) => {
  if (!prisma) throw Error("Database connection failed.");
  return {
    token: req.headers.token as string,
    prisma,
    res,
    req,
    // @ts-ignore
    userId: req.userId,
  };
};
