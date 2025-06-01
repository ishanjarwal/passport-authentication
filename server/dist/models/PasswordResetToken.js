"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetToken = void 0;
const mongoose_1 = require("mongoose");
const PasswordResetTokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true });
PasswordResetTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 10 } // auto delete after 10 minutes
);
exports.PasswordResetToken = (0, mongoose_1.model)("password_reset_tokens", PasswordResetTokenSchema);
