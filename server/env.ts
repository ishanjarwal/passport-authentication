import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  DB_URL: z.string().url(),
  FRONTEND_HOST: z.string().url(),
  SALT_ROUNDS: z.coerce.number().default(10),
  EMAIL_USER: z.string().email().nonempty(),
  EMAIL_FROM: z.string().email().nonempty(),
  EMAIL_PASSWORD: z.string().nonempty(),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_PROVIDER: z.string().nonempty(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_PASSWORD_RESET_SECRET: z.string(),
  ENVIRONMENT: z.string(),
});

export const env = envSchema.parse(process.env);
