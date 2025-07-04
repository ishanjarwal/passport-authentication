"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    is_verified: { type: Boolean, default: false },
    login_provider: { type: String, default: null },
    bio: { type: String, required: false },
}, { timestamps: true });
const UserModel = mongoose_1.default.model("user", userSchema);
exports.default = UserModel;
