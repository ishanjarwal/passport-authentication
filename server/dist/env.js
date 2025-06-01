"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(8080),
    DB_URL: zod_1.z.string().url(),
    FRONTEND_HOST: zod_1.z.string().url(),
    SALT_ROUNDS: zod_1.z.coerce.number().default(10),
    EMAIL_USER: zod_1.z.string().email().nonempty(),
    EMAIL_FROM: zod_1.z.string().email().nonempty(),
    EMAIL_PASSWORD: zod_1.z.string().nonempty(),
    EMAIL_PORT: zod_1.z.coerce.number(),
    EMAIL_PROVIDER: zod_1.z.string().nonempty(),
    JWT_ACCESS_TOKEN_SECRET: zod_1.z.string(),
    JWT_REFRESH_TOKEN_SECRET: zod_1.z.string(),
    JWT_PASSWORD_RESET_SECRET: zod_1.z.string(),
    ENVIRONMENT: zod_1.z.string(),
    GOOGLE_CLIENT_ID: zod_1.z.string(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string(),
});
exports.env = envSchema.parse(process.env);
