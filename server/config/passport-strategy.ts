import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import UserModel from "../models/User";
import { env } from "../env";

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findOne({ _id: jwt_payload.id }).select(
        "-password"
      );
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
