// middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const rateLimiter = (
  windowMs: number, // window size in milliseconds
  maxAttempts: number, // max number of allowed requests
  message: string // custom message on limit exceed
) => {
  return rateLimit({
    windowMs,
    max: maxAttempts,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        status: "error",
        message,
      });
    },
  });
};
