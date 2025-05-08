import express from "express";
import { createUser } from "../controllers/User";
import { validateUser } from "../validators/userValidator";
import { handleValidation } from "../middlewares/validationHandler";
const userRouter = express.Router();

userRouter.post("/", validateUser, handleValidation, createUser);
export default userRouter;
