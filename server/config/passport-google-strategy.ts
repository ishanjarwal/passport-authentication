import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "../env";
import UserModel, { UserValues } from "../models/User";
import generateTokens from "../utils/generateTokens";
import bcrypt from "bcrypt";
import generateRandomPassword from "../utils/generateRandomPassword";
import googleAuthPasswordSender from "../utils/googleAuthPasswordSender";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // console.log(profile);
        let user: UserValues | null;
        user = await UserModel.findOne({
          email: profile._json.email,
        });

        if (!user) {
          // if user not found, then register new user
          const { email, name } = profile._json;
          const password = generateRandomPassword(8);
          const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
          const hashedPassword = await bcrypt.hash(password, salt);
          user = await new UserModel({
            name: name,
            email: email,
            is_verified: true,
            password: hashedPassword,
            login_provider: "google",
          }).save();
          await googleAuthPasswordSender(
            email as string,
            name as string,
            password
          );
        }

        const {
          accessToken,
          accessTokenExpiry,
          refreshToken,
          refreshTokenExpiry,
        } = await generateTokens(user);
        return cb(null, {
          user,
          accessToken,
          accessTokenExpiry,
          refreshToken,
          refreshTokenExpiry,
        });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
