import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserValues } from "../models/User";

const passportAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: UserValues | false, info: any) => {
      if (err || !user) {
        res.status(401).json({
          status: "fail",
          message: info?.message || "Unauthorized access",
        });
        return;
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export default passportAuthenticate;
