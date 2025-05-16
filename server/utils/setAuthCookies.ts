import { Response } from "express";
import { TokenValues } from "./generateTokens";

const setAuthCookies = (res: Response, tokens: TokenValues) => {
  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenExpiry: newAccessTokenExp,
    refreshTokenExpiry: newRefreshTokenExp,
  } = tokens;
  const accessTokenMaxAge =
    (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenmaxAge =
    (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    maxAge: accessTokenMaxAge,
    // sameSite: 'strict', // Adjust according to your requirements
  });

  // Set Cookie for Refresh Token
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    maxAge: refreshTokenmaxAge,
    // sameSite: 'strict', // Adjust according to your requirements
  });
};

export default setAuthCookies;
