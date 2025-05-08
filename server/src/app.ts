import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../config/dbconnect";
import { env } from "../env";
import userRouter from "../routes/userRouter";

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

// user routes
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`backend running on port : ${port}`);
});
