"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This middleware will set Authorization Header and will refresh access token on expire
// if we use this middleware we won't have to explicitly make request to refresh-token api url
const isTokenExpired_1 = __importDefault(require("../utils/isTokenExpired"));
const refreshTokens_1 = __importDefault(require("../utils/refreshTokens"));
const setAuthCookies_1 = __importDefault(require("../utils/setAuthCookies"));
const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        //  if found + not expired then add the access token to the Authorization header
        if (accessToken && !(0, isTokenExpired_1.default)(accessToken)) {
            req.headers["authorization"] = `Bearer ${accessToken}`;
        }
        // If refresh token is also missing, throw an error
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("unauthorized access - refresh token not found");
        }
        // if access token not found or expired create new tokens and set in cookies + auth header
        if (!accessToken || (0, isTokenExpired_1.default)(accessToken)) {
            const { newAccessToken, newAccessTokenExp, newRefreshToken, newRefreshTokenExp, } = await (0, refreshTokens_1.default)(req, res);
            // set cookies
            (0, setAuthCookies_1.default)(res, {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                accessTokenExpiry: newAccessTokenExp,
                refreshTokenExpiry: newRefreshTokenExp,
            });
            //  Add the access token to the Authorization header
            req.headers["authorization"] = `Bearer ${newAccessToken}`;
        }
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            message: error.message || "Something went wrong",
        });
    }
};
exports.default = accessTokenAutoRefresh;
