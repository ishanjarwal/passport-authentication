"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const verificationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: { type: String, required: true },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
    createdAt: { type: Date, default: Date.now, expires: "10m" },
});
const VerificationModel = mongoose_1.default.model("verification", verificationSchema);
exports.default = VerificationModel;
