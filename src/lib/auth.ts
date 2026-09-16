import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import config from "../config/env";
import { sendEmail } from "../utils/sendEmail";
import { renderVerificationEmail } from "../templates/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: config.betterAuthSecret,
  baseURL: config.betterAuthUrl,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const emailContent = renderVerificationEmail({ name: user.name, url });
      await sendEmail({
        to: user.email,
        ...emailContent,
      });
    },
  },
});

