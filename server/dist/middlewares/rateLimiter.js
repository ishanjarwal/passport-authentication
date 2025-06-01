"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
// middleware/rateLimiter.ts
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimiter = (windowMs, // window size in milliseconds
maxAttempts, // max number of allowed requests
message // custom message on limit exceed
) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max: maxAttempts,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                status: "error",
                message,
            });
        },
    });
};
exports.rateLimiter = rateLimiter;
