"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const isUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ status: "fail", message: "unauthorized" });
            return;
        }
        const existing = await User_1.default.findOne({ email });
        if (!existing) {
            res.status(400).json({ status: "fail", message: "unauthorized" });
            return;
        }
        req.body.user = existing;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
exports.default = isUser;
