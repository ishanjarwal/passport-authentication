import express from "express";
import {
  changeUserPassword,
  createUser,
  loginUser,
  logoutUser,
  resendOTP,
  userProfile,
  verifyEmail,
} from "../controllers/User";
import {
  validateEmail,
  validateEmailVerification,
  validateLogin,
  validatePasswordChange,
  validateUser,
} from "../validators/userValidator";
import { handleValidation } from "../middlewares/validationHandler";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh";
import passport from "passport";
import passportAuthenticate from "../middlewares/passportAuthenticate";

const userRouter = express.Router();

userRouter
  .post("/", validateUser, handleValidation, createUser)
  .post(
    "/verify-email",
    validateEmailVerification,
    handleValidation,
    verifyEmail
  )
  .post("/resend-otp", validateEmail, handleValidation, resendOTP)
  .post("/login", validateLogin, handleValidation, loginUser);

// protected routes
userRouter
  .get("/me", accessTokenAutoRefresh, passportAuthenticate, userProfile)
  .get("/logout", accessTokenAutoRefresh, passportAuthenticate, logoutUser)
  .post(
    "/change-password",
    accessTokenAutoRefresh,
    passportAuthenticate,
    validatePasswordChange,
    handleValidation,
    changeUserPassword
  );

export default userRouter;
