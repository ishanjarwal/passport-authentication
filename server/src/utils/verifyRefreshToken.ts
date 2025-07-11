import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { env } from "../env";
import RefreshTokenModel from "../models/RefreshToken";

const verifyRefreshToken = async (token: string): Promise<JwtPayload> => {
  try {
    // Find the refresh token document
    const userRefreshToken = await RefreshTokenModel.findOne({ token });
    if (!userRefreshToken) {
      throw new Error("unauthorized access : refresh token doc not found");
    }

    // Verify the refresh token and return the paylod
    const tokenDetails = jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET);
    return tokenDetails as JwtPayload;
  } catch (error: Error | JsonWebTokenError | any) {
    if (error instanceof JsonWebTokenError) {
      throw new Error("unauthorized access, couldn't verify token");
    }
    throw new Error(error.message);
  }
};

export default verifyRefreshToken;
