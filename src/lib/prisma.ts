import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { Pool } from "pg";
import config from "../config/env";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      config.nodeEnv === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (config.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

