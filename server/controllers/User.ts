import { Request, Response } from "express";
import UserModel, { UserValues } from "../models/User";
import bcrypt from "bcrypt";
import { env } from "../env";
import OTPSender from "../utils/OTPSender";
import VerificationModel from "../models/Verification";
import mongoose from "mongoose";
import generateTokens from "../utils/generateTokens";
import RefreshTokenModel from "../models/RefreshToken";
import setAuthCookies from "../utils/setAuthCookies";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PasswordResetToken } from "../models/PasswordResetToken";
import passwordResetMailSender from "../utils/passwordResetMailSender";

// User Registration
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // check for existing user
    const check = await UserModel.findOne({ email });
    if (check) {
      res.status(400).json({
        status: "fail",
        message: "user already exists, try signing in",
      });
      return;
    }

    // hash password and generate new user
    const salt = await bcrypt.genSalt(Number(Number(env.SALT_ROUNDS)));
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

    await new VerificationModel({ userId: newUser._id, otp }).save();

    res.status(200).json({
      status: "success",
      message: "User created, Verification OTP sent",
      body: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
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
      userId: existingUser._id,
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
    await VerificationModel.deleteMany({ userId: existingUser._id });

    res
      .status(200)
      .json({ status: "success", message: "Account verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
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
      userId: existingUser._id,
    });
    if (
      !isVerified ||
      (isVerified.createdAt as Date) < new Date(Date.now() - 2 * 60 * 1000)
    ) {
      await VerificationModel.deleteMany({ userId: existingUser._id });
      const otp = await OTPSender(
        existingUser.email as string,
        existingUser.name as string
      );
      await new VerificationModel({ userId: existingUser._id, otp }).save();
      res.status(200).json({ status: "success", message: "OTP resent" });
      return;
    }
    res.status(400).json({ status: "fail", message: "Resend after 2 minutes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existing: UserValues | null = await UserModel.findOne({ email });
    if (!existing) {
      res
        .status(400)
        .json({ status: "fail", message: "invalid email or password" });
      return;
    }
    const enc_password = await bcrypt.compare(password, existing.password);
    if (!enc_password) {
      res
        .status(400)
        .json({ status: "fail", message: "invalid email or password" });
      return;
    }
    if (!existing.is_verified) {
      res
        .status(400)
        .json({ status: "fail", message: "please verify your account" });
      return;
    }

    // remove existing refresh token if any
    const existingRefreshToken = await RefreshTokenModel.findOne({
      userId: existing._id,
    });
    if (existingRefreshToken) await existingRefreshToken.deleteOne();

    // generate tokens and store it in db
    const { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry } =
      await generateTokens(existing);

    // set the cookies
    setAuthCookies(res, {
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    });

    res.status(200).json({
      status: "success",
      message: "logged in successfully",
      body: { id: existing._id, name: existing.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};

// Change password
export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserValues;
    if (!user) {
      throw new Error();
    }
    const { password } = req.body;
    const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
    const newPasswordHash = await bcrypt.hash(password, salt);
    await UserModel.findByIdAndUpdate(user._id, {
      $set: { password: newPasswordHash },
    });
    res.status(200).json({ status: "success", message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Somet hing went wrong" });
  }
};

// password reset email
export const sendPasswordResetEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ status: "fail", message: "No user found with this email" });
      return;
    }

    const existingToken = await PasswordResetToken.findOne({
      userId: user._id,
    });

    if (existingToken) {
      const createdAt = existingToken.createdAt.getTime();
      const now = Date.now();
      // Prevent if less than 2 minutes have passed since last request
      if (now - createdAt < 2 * 60 * 1000) {
        res.status(400).json({
          status: "fail",
          message: "Please wait 2 minutes before requesting another reset link",
        });
        return;
      } else {
        await existingToken.deleteOne();
      }
    }

    const payload = { userId: user._id.toString(), email: user.email };
    const expiry = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes

    const token = jwt.sign(
      { ...payload, expiry },
      env.JWT_PASSWORD_RESET_SECRET
    );

    const newToken = new PasswordResetToken({
      userId: new mongoose.Types.ObjectId(user._id),
      token,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newToken.save();

    await passwordResetMailSender(user.email, user.name, token);

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email",
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
    return;
  }
};

// reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // validate token (in db and with jwt)
    const tokenDetails = jwt.verify(
      token,
      env.JWT_PASSWORD_RESET_SECRET
    ) as JwtPayload;
    if (tokenDetails.expiry < Math.floor(Date.now() / 1000)) {
      res.status(400).json({
        status: "fail",
        message: "Link expired, please send another link",
      });
      return;
    }

    const user = await UserModel.findById(tokenDetails.userId);
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "invalid request",
      });
      return;
    }

    const existingToken = await PasswordResetToken.findOne({
      userId: user._id,
    });
    if (!existingToken) {
      res.status(400).json({
        status: "fail",
        message: "invalid request",
      });
      return;
    }
    await PasswordResetToken.deleteMany({ userId: user._id });

    const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "password reset successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
    return;
  }
};

// get User (used with a middleware always)
export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserValues;
    if (!user) {
      throw new Error("something went wrong");
    }
    res.status(200).json({
      status: "success",
      message: "user details fetched",
      body: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};

// Logout
export const logoutUser = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await RefreshTokenModel.deleteMany({ token: refreshToken });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success", message: "logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserValues;

    const { name } = req.body || {};
    const updates: any = {};

    if (name) updates.name = name;
    // if (email) updates.email = email;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ status: "fail", message: "Nothing to update" });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password"); // exclude password field from response

    if (!updatedUser) {
      res.status(404).json({
        status: "fail",
        message: "user not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
    return;
  }
};
