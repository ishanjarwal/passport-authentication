// This middleware will set Authorization Header and will refresh access token on expire
// if we use this middleware we won't have to explicitly make request to refresh-token api url
import isTokenExpired from "../utils/isTokenExpired";
import { NextFunction, Request, Response } from "express";
import refreshTokens from "../utils/refreshTokens";
import setAuthCookies from "../utils/setAuthCookies";
const accessTokenAutoRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    //  if found + not expired then add the access token to the Authorization header
    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }

    // If refresh token is also missing, throw an error
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new Error("unauthorized access - refresh token not found");
    }

    // if access token not found or expired create new tokens and set in cookies + auth header
    if (!accessToken || isTokenExpired(accessToken)) {
      const {
        newAccessToken,
        newAccessTokenExp,
        newRefreshToken,
        newRefreshTokenExp,
      } = await refreshTokens(req, res);

      // set cookies
      setAuthCookies(res, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiry: newAccessTokenExp,
        refreshTokenExpiry: newRefreshTokenExp,
      });

      //  Add the access token to the Authorization header
      req.headers["authorization"] = `Bearer ${newAccessToken}`;
    }
    next();
  } catch (error: Error | any) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

export default accessTokenAutoRefresh;
