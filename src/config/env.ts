import dotenv from "dotenv";
import path from "path";

// Load .env file from root directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

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
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: Number(getEnv("PORT", "5000")),
  DATABASE_URL: getEnv("DATABASE_URL"),
  BETTER_AUTH_SECRET: getEnv("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: getEnv("BETTER_AUTH_URL"),
  SMTP_USER: getEnv("SMTP_USER"),
  SMTP_PASS: getEnv("SMTP_PASS"),
  SMTP_FROM: getEnv("SMTP_FROM"),
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
