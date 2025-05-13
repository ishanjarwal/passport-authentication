import express from "express";
import {
  createUser,
  loginUser,
  resendOTP,
  verifyEmail,
} from "../controllers/User";
import {
  validateEmail,
  validateEmailVerification,
  validateLogin,
  validateUser,
} from "../validators/userValidator";
import { handleValidation } from "../middlewares/validationHandler";
import isUser from "../middlewares/isUser";
import isVerifiedUser from "../middlewares/isVerifiedUser";
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

export default userRouter;
