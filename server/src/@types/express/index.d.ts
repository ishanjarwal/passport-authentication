import { Document } from "mongoose";
import { UserValues } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserValues & Document;
    }
  }
}
