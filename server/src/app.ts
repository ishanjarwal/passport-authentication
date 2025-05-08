import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT;

const app = express();

// enable cors
const corsWhitelist: string[] = [process.env.FRONTEND_HOST || ""];
const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || corsWhitelist.indexOf(requestOrigin) == -1) {
      callback(new Error("Blocked by CORS Policy"));
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// enable cookie parser and json support
app.use(cookieParser());
app.use(express.json({ limit: "10mb", type: "application/json" }));

app.listen(port, () => {
  console.log(`backend running on port : ${port}`);
});
