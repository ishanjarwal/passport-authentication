import { Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import { env } from "../env";
import { ControllerReturn } from "../types/ControllerReturn";
import OTPSender from "../utils/OTPSender";
import VerificationModel from "../models/Verification";

// User Registration
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // check for existing user
    const check = await UserModel.findOne({ email });
    if (check) {
      res.status(400).json({
        status: "fail",
        message: "User already exists",
      } as ControllerReturn);
      return;
    }

    // hash password and generate new user
    const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    const otp = await OTPSender(
      newUser.email as string,
      newUser.name as string
    );

    await new VerificationModel({ userId: newUser.id, otp }).save();

    res.status(200).json({
      status: "success",
      message: "User created, Verification OTP sent",
      body: { id: newUser.id, email: newUser.email },
    } as ControllerReturn);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Something went",
    } as ControllerReturn);
  }
};

// User Email verification

// User Login

// Get new access/refresh token

// Change password

// password reset email

// get User

// Logout
