import dotenv from "dotenv";
import path from "path";

// Load .env file from root directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
}

export const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
};

// Aliases for convenience (config / env with lowercase properties)
export const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  ...env,
};

export default config;
