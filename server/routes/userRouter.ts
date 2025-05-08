import express from "express";
import { createUser, resendOTP, verifyEmail } from "../controllers/User";
import {
  validateEmail,
  validateEmailVerification,
  validateUser,
} from "../validators/userValidator";
import { handleValidation } from "../middlewares/validationHandler";
const userRouter = express.Router();

userRouter
  .post("/", validateUser, handleValidation, createUser)
  .post(
    "/verify-email",
    validateEmailVerification,
    handleValidation,
    verifyEmail
  )
  .post("/resend-otp", validateEmail, handleValidation, resendOTP);

export default userRouter;
