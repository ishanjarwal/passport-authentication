"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const accessTokenAutoRefresh_1 = __importDefault(require("../middlewares/accessTokenAutoRefresh"));
const passportAuthenticate_1 = __importDefault(require("../middlewares/passportAuthenticate"));
const rateLimiter_1 = require("../middlewares/rateLimiter");
const validationHandler_1 = require("../middlewares/validationHandler");
const userValidator_1 = require("../validators/userValidator");
const userRouter = express_1.default.Router();
userRouter
    .post("/", (0, rateLimiter_1.rateLimiter)(1 * 60 * 1000, 2, "Please try again after some time"), userValidator_1.validateUser, validationHandler_1.handleValidation, User_1.createUser)
    .post("/verify-email", (0, rateLimiter_1.rateLimiter)(1 * 60 * 1000, 2, "Please try again after some time"), userValidator_1.validateEmailVerification, validationHandler_1.handleValidation, User_1.verifyEmail)
    .post("/resend-otp", (0, rateLimiter_1.rateLimiter)(2 * 60 * 1000, 1, "Try again in 2 minutes"), userValidator_1.validateEmail, validationHandler_1.handleValidation, User_1.resendOTP)
    .post("/login", (0, rateLimiter_1.rateLimiter)(1 * 60 * 1000, 2, "Too many requests"), userValidator_1.validateLogin, validationHandler_1.handleValidation, User_1.loginUser)
    .post("/reset-password", (0, rateLimiter_1.rateLimiter)(2 * 60 * 1000, 1, "Try again in 2 minutes"), userValidator_1.validateEmail, validationHandler_1.handleValidation, User_1.sendPasswordResetEmail)
    .post("/reset-password/:token", (0, rateLimiter_1.rateLimiter)(5 * 60 * 1000, 10, "Please try again after some time"), userValidator_1.validatePasswordReset, validationHandler_1.handleValidation, User_1.resetPassword);
// protected routes
userRouter
    .get("/me", (0, rateLimiter_1.rateLimiter)(1 * 60 * 1000, 30, "Please try again later"), accessTokenAutoRefresh_1.default, passportAuthenticate_1.default, User_1.userProfile)
    .get("/logout", (0, rateLimiter_1.rateLimiter)(2 * 60 * 1000, 5, "Please try again later"), accessTokenAutoRefresh_1.default, passportAuthenticate_1.default, User_1.logoutUser)
    .post("/change-password", (0, rateLimiter_1.rateLimiter)(10 * 60 * 1000, 1, "Please try again in 10 minutes"), accessTokenAutoRefresh_1.default, passportAuthenticate_1.default, userValidator_1.validatePasswordChange, validationHandler_1.handleValidation, User_1.changeUserPassword)
    .put("/", (0, rateLimiter_1.rateLimiter)(1 * 60 * 1000, 2, "Please try again later"), accessTokenAutoRefresh_1.default, passportAuthenticate_1.default, userValidator_1.validateUpdateUser, validationHandler_1.handleValidation, User_1.updateUser);
exports.default = userRouter;
