import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";

const isLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if user logged in
    // const {id} =
    // const existing = await UserModel.findOne({_id: user.id})
    // req.body.user = existing
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};
