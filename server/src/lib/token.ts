import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const createTokens = (user: User) => {
  const userTok = { userId: user.userId };
  const token = jwt.sign(userTok, process.env.TOKEN_SECRET as string, {
    expiresIn: "10s",
  });
  const refreshToken = jwt.sign(
    userTok,
    process.env.REFRESH_TOKEN_SECRET + user.password,
    {
      expiresIn: "7d",
    }
  );
  return { token, refreshToken };
};
