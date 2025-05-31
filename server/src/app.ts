import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../config/dbconnect";
import { env } from "../env";
import userRouter from "../routes/userRouter";
import passport from "passport";
import "../config/passport-strategy";
import "../config/passport-google-strategy";
import setAuthCookies from "../utils/setAuthCookies";

const port = env.PORT;

const app = express();

// enable cors
const corsWhitelist: string[] = [env.FRONTEND_HOST];
const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || corsWhitelist.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS Policy"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// enable cookie parser and express.json support (replacement for body-parser)
app.use(cookieParser());
app.use(express.json({ limit: "10mb", type: "application/json" }));

// connect to database
connectDB(env.DB_URL);

// initialize passport
app.use(passport.initialize());

// user routes
app.use("/api/v1/user", userRouter);

// google auth
app.get(
  "/api/v1/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const {
      user,
      accessToken,
      accessTokenExpiry,
      refreshToken,
      refreshTokenExpiry,
    } = req.user as any;

    setAuthCookies(res, {
      accessToken,
      accessTokenExpiry,
      refreshToken,
      refreshTokenExpiry,
    });

    res.redirect(`${env.FRONTEND_HOST}/account/profile`);
  }
);

app.listen(port, () => {
  console.log(`backend running on port : ${port}`);
});
