import dotenv from "dotenv";
import path from "path";

// Load .env file from root directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
}

export const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  BETTER_AUTH_SECRET:
    process.env.BETTER_AUTH_SECRET || "default_super_secret_better_auth_key_123456",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:7000",
  SMTP_USER: process.env.SMTP_USER || "rakib.trip963@gmail.com",
  SMTP_PASS: process.env.SMTP_PASS || "hqlppsodwwtwnwwi",
  SMTP_FROM:
    process.env.SMTP_FROM || "Doctor Management <rakib.trip963@gmail.com>",
};

// Aliases for convenience (config / env with lowercase properties)
export const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  betterAuthSecret: env.BETTER_AUTH_SECRET,
  betterAuthUrl: env.BETTER_AUTH_URL,
  smtpUser: env.SMTP_USER,
  smtpPass: env.SMTP_PASS,
  smtpFrom: env.SMTP_FROM,
  ...env,
};

export default config;
