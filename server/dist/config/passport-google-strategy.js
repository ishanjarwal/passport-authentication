"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("../env");
const User_1 = __importDefault(require("../models/User"));
const generateTokens_1 = __importDefault(require("../utils/generateTokens"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateRandomPassword_1 = __importDefault(require("../utils/generateRandomPassword"));
const googleAuthPasswordSender_1 = __importDefault(require("../utils/googleAuthPasswordSender"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.env.GOOGLE_CLIENT_ID,
    clientSecret: env_1.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback",
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        // console.log(profile);
        let user;
        user = await User_1.default.findOne({
            email: profile._json.email,
        });
        if (!user) {
            // if user not found, then register new user
            const { email, name } = profile._json;
            const password = (0, generateRandomPassword_1.default)(8);
            const salt = await bcrypt_1.default.genSalt(env_1.env.SALT_ROUNDS);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            user = await new User_1.default({
                name: name,
                email: email,
                is_verified: true,
                password: hashedPassword,
                login_provider: "google",
            }).save();
            await (0, googleAuthPasswordSender_1.default)(email, name, password);
        }
        const { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry, } = await (0, generateTokens_1.default)(user);
        return cb(null, {
            user,
            accessToken,
            accessTokenExpiry,
            refreshToken,
            refreshTokenExpiry,
        });
    }
    catch (error) {
        return cb(error);
    }
}));
