import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { type Response, type Request, NextFunction } from "express";
import { User } from "@prisma/client";
import { createTokens } from "./token";
import jwt from "jsonwebtoken";
import { TJwtUserPayload } from "../types";
import { prisma } from "./prisma";
import { authDirective } from "../graphql/directive/auth";

export const makeSchema = () => {
  const { authDirectiveTypeDefs, authDirectiveTransformer } =
    authDirective("auth");

  const typeDefsArray = loadFilesSync(
    path.join(__dirname, "../graphql/schema")
  );
  const resolversArray = loadFilesSync(
    path.join(__dirname, "../graphql/resolvers")
  );
  const typeDefs = mergeTypeDefs(typeDefsArray);
  const resolvers = mergeResolvers(resolversArray);

  let schema = makeExecutableSchema({ typeDefs, resolvers });
  schema = authDirectiveTransformer(schema);
  return schema;
};

export const setTokens = (res: Response, user: User) => {
  const { token, refreshToken } = createTokens(user);
  res.cookie("token", token, { httpOnly: true, maxAge: 10 * 1000 });
  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};

export const handleTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  const refreshToken = cookies["refresh-token"];
  const token = cookies["token"];
  try {
    const decodedRefreshToken = jwt.decode(refreshToken) as TJwtUserPayload;
    if (token) {
      const { userId } = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as TJwtUserPayload;
      if (userId !== decodedRefreshToken.userId) throw Error;
      // @ts-ignore
      req.userId = userId;
    }
    if (!token && refreshToken) {
      const user = await prisma.user.findFirstOrThrow({
        where: { userId: decodedRefreshToken.userId },
      });
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET + user.password;
      const verifyRefreshToken = jwt.verify(refreshToken, refreshSecret);
      if (!verifyRefreshToken) throw Error;

      setTokens(res, user);
      // res.cookie("token")
      // @ts-ignore
      req.userId = user.userId;
    }
  } catch {
    return null;
  } finally {
    next();
  }
};

export const newHandleTokens = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  const refreshToken = cookies["refresh-token"];
  const token = cookies["token"];
  try {
    const decodedRefreshToken = jwt.decode(refreshToken) as TJwtUserPayload;
    if (token) {
      const { userId } = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as TJwtUserPayload;
      if (userId !== decodedRefreshToken.userId) throw Error;
      // @ts-ignore
      req.userId = userId;
    }
    if (!token && refreshToken) {
      const user = await prisma.user.findFirstOrThrow({
        where: { userId: decodedRefreshToken.userId },
      });
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET + user.password;
      const verifyRefreshToken = jwt.verify(refreshToken, refreshSecret);
      if (!verifyRefreshToken) throw Error;

      setTokens(res, user);
      // res.cookie("token")
      // @ts-ignore
      req.userId = user.userId;
    }
  } catch {
    throw new Error("Not Authenticated");
  }
};

const handle = async (token: string, refreshToken: string) => {
  try {
    const decodedRefreshToken = jwt.decode(refreshToken) as TJwtUserPayload;
    if (token) {
      const { userId } = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as TJwtUserPayload;
      if (userId !== decodedRefreshToken.userId) throw Error;
      // @ts-ignore
      req.userId = userId;
    }
    if (!token && refreshToken) {
      const user = await prisma.user.findFirstOrThrow({
        where: { userId: decodedRefreshToken.userId },
      });
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET + user.password;
      const verifyRefreshToken = jwt.verify(refreshToken, refreshSecret);
      if (!verifyRefreshToken) throw Error;

      // setTokens(res, user);
      // res.cookie("token")
      // @ts-ignore
      req.userId = user.userId;
    }
  } catch {
    return null;
  }
};

// export const totok = async () =>{

//   try {
//     const decodedRefreshToken = jwt.decode(refreshToken) as TJwtUserPayload;
//     if (token) {
//       const { userId } = jwt.verify(
//         token,
//         process.env.TOKEN_SECRET as string
//       ) as TJwtUserPayload;
//       if (userId !== decodedRefreshToken.userId) throw Error;
//       // @ts-ignore
//       req.userId = userId;
//     }
//     if (!token && refreshToken) {
//       const user = await prisma.user.findFirstOrThrow({
//         where: { userId: decodedRefreshToken.userId },
//       });
//       const refreshSecret = process.env.REFRESH_TOKEN_SECRET + user.password;
//       const verifyRefreshToken = jwt.verify(refreshToken, refreshSecret);
//       if (!verifyRefreshToken) throw Error;
// }
