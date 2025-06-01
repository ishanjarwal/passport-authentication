"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const generateTokens = async (user) => {
    try {
        const payload = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
        const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // 100 sec from now
        const refreshTokenExpiry = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days sec from now
        const accessToken = jsonwebtoken_1.default.sign({ ...payload, expiry: accessTokenExpiry }, env_1.env.JWT_ACCESS_TOKEN_SECRET
        //   { expiresIn: "100s" }
        );
        const refreshToken = jsonwebtoken_1.default.sign({ ...payload, expiry: refreshTokenExpiry }, env_1.env.JWT_REFRESH_TOKEN_SECRET
        //   { expiresIn: "7d" }
        );
        // remove the exising refreshtoken in db and add new one
        await RefreshToken_1.default.deleteMany({ userId: user.id });
        await new RefreshToken_1.default({
            userId: user.id,
            token: refreshToken,
        }).save();
        return { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry };
    }
    catch (error) {
        throw error;
    }
};
exports.default = generateTokens;
