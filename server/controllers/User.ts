import { Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import { env } from "../env";
import { ControllerReturn } from "../types/ControllerReturn";
import OTPSender from "../utils/OTPSender";
import VerificationModel from "../models/Verification";
import { Document } from "mongoose";

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
      message: "Something went wrong",
    } as ControllerReturn);
  }
};

// User Email verification
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ status: "fail", message: "No user found" });
      return;
    }

    if (existingUser.is_verified === true) {
      res.status(200).json({ status: "success", message: "Already verified" });
      return;
    }

    const isVerified = await VerificationModel.findOne({
      userId: existingUser.id,
      otp,
    });

    if (!isVerified) {
      res.status(400).json({ status: "fail", message: "Invalid OTP" });
      return;
    }

    if ((isVerified.expiresAt as Date) < new Date()) {
      res.status(400).json({
        status: "fail",
        message: "OTP Expired, Please resend the OTP",
      });
      return;
    }

    existingUser.is_verified = true;
    await existingUser.save();
    await VerificationModel.deleteMany({ userId: existingUser.id });

    res
      .status(200)
      .json({ status: "success", message: "Account verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    } as ControllerReturn);
  }
};

// resend otp
export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ status: "fail", message: "No users found" });
      return;
    }

    if (existingUser.is_verified) {
      res.status(200).json({ status: "success", message: "Already verified" });
      return;
    }

    const isVerified = await VerificationModel.findOne({
      userId: existingUser.id,
    });
    if (
      !isVerified ||
      (isVerified.createdAt as Date) < new Date(Date.now() - 2 * 60 * 1000)
    ) {
      await VerificationModel.deleteMany({ userId: existingUser.id });
      const otp = await OTPSender(
        existingUser.email as string,
        existingUser.name as string
      );
      await new VerificationModel({ userId: existingUser.id, otp }).save();
      res.status(200).json({ status: "success", message: "OTP resent" });
      return;
    }
    res.status(400).json({ status: "fail", message: "Resend after 2 minutes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existing = await UserModel.findOne({ email });
    if (!existing) {
      res
        .status(400)
        .json({ status: "fail", message: "invalid email or password" });
      return;
    }
    const enc_password = await bcrypt.compare(
      password,
      existing.password as string
    );
    if (!enc_password) {
      res
        .status(400)
        .json({ status: "fail", message: "invalid email or password" });
      return;
    }

    // generate tokens and store it in db

    res
      .status(200)
      .json({ status: "success", message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

// Get new access/refresh token

// Change password

// password reset email

// get User

// Logout
