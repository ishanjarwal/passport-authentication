import express from "express";
import {
  createUser,
  loginUser,
  resendOTP,
  userProfile,
  verifyEmail,
} from "../controllers/User";
import {
  validateEmail,
  validateEmailVerification,
  validateLogin,
  validateUser,
} from "../validators/userValidator";
import { handleValidation } from "../middlewares/validationHandler";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh";
import passport from "passport";

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
userRouter.get(
  "/me",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  userProfile
);

export default userRouter;
