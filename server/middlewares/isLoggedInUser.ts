import { NextFunction, Request, Response } from "express";

const isLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};
