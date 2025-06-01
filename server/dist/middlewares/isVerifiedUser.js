"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const isVerifiedUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ status: "fail", message: "no users found" });
            return;
        }
        const verified = await User_1.default.findOne({ email, is_verified: true });
        if (!verified) {
            res.status(400).json({ status: "fail", message: "unauthorized" });
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
exports.default = isVerifiedUser;
