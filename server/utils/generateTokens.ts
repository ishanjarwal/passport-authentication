import { Document } from "mongoose";
import { env } from "../env";
import { UserValues } from "../models/User";
import jwt from "jsonwebtoken";

export interface TokenValues {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
}

const generateTokens = async (user: UserValues): Promise<TokenValues> => {
  try {
    const payload = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };

    const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // 100 sec from now
    const refreshTokenExpiry = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days sec from now

    const accessToken = jwt.sign(
      { ...payload, expiry: accessTokenExpiry },
      env.JWT_ACCESS_TOKEN_SECRET
      //   { expiresIn: "100s" }
    );
    const refreshToken = jwt.sign(
      { ...payload, expiry: refreshTokenExpiry },
      env.JWT_REFRESH_TOKEN_SECRET
      //   { expiresIn: "7d" }
    );
    return { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry };
  } catch (error) {
    throw error;
  }
};

export default generateTokens;
