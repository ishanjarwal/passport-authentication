import express from "express";
import { createUser, verifyEmail } from "../controllers/User";
import {
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
  );

export default userRouter;
