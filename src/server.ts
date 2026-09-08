import type { Server } from "http";
import app from "./app";
import config from "./config/env";
import prisma from "./lib/prisma";

let server: Server;

const bootstrap = async () => {
  try {
    // 1. Establish Database Connection
    await prisma.$connect();
    console.info("Database connected successfully");

    // 2. Start Express Server
    server = app.listen(config.port, () => {
      console.info(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const handleExit = async (signal: string) => {
  console.info(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      console.info("Server closed and database disconnected.");
      process.exit(0);
    });
  } else {
    await prisma.$disconnect();
    process.exit(0);
  }
};

process.on("SIGINT", () => handleExit("SIGINT"));
process.on("SIGTERM", () => handleExit("SIGTERM"));

bootstrap();

