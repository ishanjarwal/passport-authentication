import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";

const isVerifiedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ status: "fail", message: "no users found" });
      return;
    }
    const verified = await UserModel.findOne({ email, is_verified: true });
    if (!verified) {
      res.status(400).json({ status: "fail", message: "unauthorized" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};

export default isVerifiedUser;
