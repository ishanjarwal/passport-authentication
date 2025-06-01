import express from "express";
import {
  changeUserPassword,
  createUser,
  loginUser,
  logoutUser,
  resendOTP,
  resetPassword,
  sendPasswordResetEmail,
  updateUser,
  userProfile,
  verifyEmail,
} from "../controllers/User";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh";
import passportAuthenticate from "../middlewares/passportAuthenticate";
import { rateLimiter } from "../middlewares/rateLimiter";
import { handleValidation } from "../middlewares/validationHandler";
import {
  validateEmail,
  validateEmailVerification,
  validateLogin,
  validatePasswordChange,
  validatePasswordReset,
  validateUpdateUser,
  validateUser,
} from "../validators/userValidator";

const userRouter = express.Router();

userRouter
  .post(
    "/",
    rateLimiter(1 * 60 * 1000, 2, "Please try again after some time"),
    validateUser,
    handleValidation,
    createUser
  )
  .post(
    "/verify-email",
    rateLimiter(1 * 60 * 1000, 2, "Please try again after some time"),
    validateEmailVerification,
    handleValidation,
    verifyEmail
  )
  .post(
    "/resend-otp",
    rateLimiter(2 * 60 * 1000, 1, "Try again in 2 minutes"),
    validateEmail,
    handleValidation,
    resendOTP
  )
  .post(
    "/login",
    rateLimiter(1 * 60 * 1000, 2, "Too many requests"),
    validateLogin,
    handleValidation,
    loginUser
  )
  .post(
    "/reset-password",
    rateLimiter(2 * 60 * 1000, 1, "Try again in 2 minutes"),
    validateEmail,
    handleValidation,
    sendPasswordResetEmail
  )
  .post(
    "/reset-password/:token",
    rateLimiter(5 * 60 * 1000, 10, "Please try again after some time"),
    validatePasswordReset,
    handleValidation,
    resetPassword
  );

// protected routes
userRouter
  .get(
    "/me",
    rateLimiter(1 * 60 * 1000, 30, "Please try again later"),
    accessTokenAutoRefresh,
    passportAuthenticate,
    userProfile
  )
  .get(
    "/logout",
    rateLimiter(2 * 60 * 1000, 5, "Please try again later"),
    accessTokenAutoRefresh,
    passportAuthenticate,
    logoutUser
  )
  .post(
    "/change-password",
    rateLimiter(10 * 60 * 1000, 1, "Please try again in 10 minutes"),
    accessTokenAutoRefresh,
    passportAuthenticate,
    validatePasswordChange,
    handleValidation,
    changeUserPassword
  )
  .put(
    "/",
    rateLimiter(1 * 60 * 1000, 2, "Please try again later"),
    accessTokenAutoRefresh,
    passportAuthenticate,
    validateUpdateUser,
    handleValidation,
    updateUser
  );

export default userRouter;
