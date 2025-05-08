import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  DB_URL: z.string().url(),
  FRONTEND_HOST: z.string().url(),
  SALT_ROUNDS: z.coerce.number().default(10),
});

export const env = envSchema.parse(process.env);
