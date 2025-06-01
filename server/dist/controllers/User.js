"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.logoutUser = exports.userProfile = exports.resetPassword = exports.sendPasswordResetEmail = exports.changeUserPassword = exports.loginUser = exports.resendOTP = exports.verifyEmail = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../env");
const OTPSender_1 = __importDefault(require("../utils/OTPSender"));
const Verification_1 = __importDefault(require("../models/Verification"));
const mongoose_1 = __importDefault(require("mongoose"));
const generateTokens_1 = __importDefault(require("../utils/generateTokens"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const setAuthCookies_1 = __importDefault(require("../utils/setAuthCookies"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PasswordResetToken_1 = require("../models/PasswordResetToken");
const passwordResetMailSender_1 = __importDefault(require("../utils/passwordResetMailSender"));
// User Registration
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check for existing user
        const check = await User_1.default.findOne({ email });
        if (check) {
            res.status(400).json({
                status: "fail",
                message: "user already exists, try signing in",
            });
            return;
        }
        // hash password and generate new user
        const salt = await bcrypt_1.default.genSalt(Number(Number(env_1.env.SALT_ROUNDS)));
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = await new User_1.default({
            name,
            email,
            password: hashedPassword,
            login_provider: null,
        }).save();
        const otp = await (0, OTPSender_1.default)(newUser.email, newUser.name);
        await new Verification_1.default({ userId: newUser._id, otp }).save();
        res.status(200).json({
            status: "success",
            message: "User created, Verification OTP sent",
            body: { id: newUser._id, email: newUser.email },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "something went wrong",
        });
    }
};
exports.createUser = createUser;
// User Email verification
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (!existingUser) {
            res.status(400).json({ status: "fail", message: "No user found" });
            return;
        }
        if (existingUser.is_verified === true) {
            res.status(200).json({ status: "success", message: "Already verified" });
            return;
        }
        const isVerified = await Verification_1.default.findOne({
            userId: existingUser._id,
            otp,
        });
        if (!isVerified) {
            res.status(400).json({ status: "fail", message: "Invalid OTP" });
            return;
        }
        if (isVerified.expiresAt < new Date()) {
            res.status(400).json({
                status: "fail",
                message: "OTP Expired, Please resend the OTP",
            });
            return;
        }
        existingUser.is_verified = true;
        await existingUser.save();
        await Verification_1.default.deleteMany({ userId: existingUser._id });
        const { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry } = await (0, generateTokens_1.default)(existingUser);
        // set the cookies
        (0, setAuthCookies_1.default)(res, {
            accessToken,
            refreshToken,
            accessTokenExpiry,
            refreshTokenExpiry,
        });
        res
            .status(200)
            .json({ status: "success", message: "Account verified and Logged In" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "something went wrong",
        });
    }
};
exports.verifyEmail = verifyEmail;
// resend otp
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (!existingUser) {
            res.status(400).json({ status: "fail", message: "No users found" });
            return;
        }
        if (existingUser.is_verified) {
            res.status(200).json({ status: "success", message: "Already verified" });
            return;
        }
        const isVerified = await Verification_1.default.findOne({
            userId: existingUser._id,
        });
        if (!isVerified ||
            isVerified.createdAt < new Date(Date.now() - 2 * 60 * 1000)) {
            await Verification_1.default.deleteMany({ userId: existingUser._id });
            const otp = await (0, OTPSender_1.default)(existingUser.email, existingUser.name);
            await new Verification_1.default({ userId: existingUser._id, otp }).save();
            res.status(200).json({ status: "success", message: "OTP resent" });
            return;
        }
        res.status(400).json({ status: "fail", message: "Resend after 2 minutes" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
exports.resendOTP = resendOTP;
// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existing = await User_1.default.findOne({ email });
        if (!existing) {
            res
                .status(400)
                .json({ status: "fail", message: "invalid email or password" });
            return;
        }
        const enc_password = await bcrypt_1.default.compare(password, existing.password);
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
        const existingRefreshToken = await RefreshToken_1.default.findOne({
            userId: existing._id,
        });
        if (existingRefreshToken)
            await existingRefreshToken.deleteOne();
        // generate tokens and store it in db
        const { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry } = await (0, generateTokens_1.default)(existing);
        // set the cookies
        (0, setAuthCookies_1.default)(res, {
            accessToken,
            refreshToken,
            accessTokenExpiry,
            refreshTokenExpiry,
        });
        res.status(200).json({
            status: "success",
            message: "logged in successfully",
            body: { id: existing._id, name: existing.name, email: existing.email },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
exports.loginUser = loginUser;
// Change password
const changeUserPassword = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error();
        }
        const existing = await User_1.default.findById(user.id);
        if (!existing) {
            res.status(400).json({ status: "fail", message: "Unauthorized access" });
            return;
        }
        const { old_password, password } = req.body;
        const compare = await bcrypt_1.default.compare(old_password, existing.password);
        if (!compare) {
            res.status(400).json({ status: "fail", message: "Wrong old password" });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(Number(env_1.env.SALT_ROUNDS));
        const newPasswordHash = await bcrypt_1.default.hash(password, salt);
        await User_1.default.findByIdAndUpdate(user._id, {
            $set: { password: newPasswordHash },
        });
        res.status(200).json({ status: "success", message: "password updated" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Somet hing went wrong" });
    }
};
exports.changeUserPassword = changeUserPassword;
// password reset email
const sendPasswordResetEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res
                .status(400)
                .json({ status: "fail", message: "No user found with this email" });
            return;
        }
        const existingToken = await PasswordResetToken_1.PasswordResetToken.findOne({
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
            }
            else {
                await existingToken.deleteOne();
            }
        }
        const payload = { userId: user._id.toString(), email: user.email };
        const expiry = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes
        const token = jsonwebtoken_1.default.sign({ ...payload, expiry }, env_1.env.JWT_PASSWORD_RESET_SECRET);
        const newToken = new PasswordResetToken_1.PasswordResetToken({
            userId: new mongoose_1.default.Types.ObjectId(user._id),
            token,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });
        await newToken.save();
        await (0, passwordResetMailSender_1.default)(user.email, user.name, token);
        res.status(200).json({
            status: "success",
            message: "Password reset link sent to your email",
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
        return;
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
// reset password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        // validate token (in db and with jwt)
        const tokenDetails = jsonwebtoken_1.default.verify(token, env_1.env.JWT_PASSWORD_RESET_SECRET);
        if (tokenDetails.expiry < Math.floor(Date.now() / 1000)) {
            res.status(400).json({
                status: "fail",
                message: "Link expired, please send another link",
            });
            return;
        }
        const user = await User_1.default.findById(tokenDetails.userId);
        if (!user) {
            res.status(400).json({
                status: "fail",
                message: "invalid request",
            });
            return;
        }
        const existingToken = await PasswordResetToken_1.PasswordResetToken.findOne({
            userId: user._id,
        });
        if (!existingToken) {
            res.status(400).json({
                status: "fail",
                message: "invalid request",
            });
            return;
        }
        await PasswordResetToken_1.PasswordResetToken.deleteMany({ userId: user._id });
        const salt = await bcrypt_1.default.genSalt(Number(env_1.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password reset successfully",
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "something went wrong",
        });
        return;
    }
};
exports.resetPassword = resetPassword;
// get User (used with a middleware always)
const userProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("something went wrong");
        }
        res.status(200).json({
            status: "success",
            message: "user details fetched",
            body: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
exports.userProfile = userProfile;
// Logout
const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await RefreshToken_1.default.deleteMany({ token: refreshToken });
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ status: "success", message: "logged out" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
exports.logoutUser = logoutUser;
const updateUser = async (req, res) => {
    try {
        const user = req.user;
        const { name, bio } = req.body || {};
        const updates = {};
        if (name)
            updates.name = name;
        if (bio)
            updates.bio = bio;
        if (Object.keys(updates).length === 0) {
            res.status(400).json({ status: "fail", message: "Nothing to update" });
            return;
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(user._id, { $set: updates }, { new: true, runValidators: true }).select("-password"); // exclude password field from response
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
            body: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "something went wrong",
        });
        return;
    }
};
exports.updateUser = updateUser;
