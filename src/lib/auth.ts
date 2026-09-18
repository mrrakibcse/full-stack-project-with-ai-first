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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.role === "PATIENT") {
            await prisma.patient.create({
              data: {
                userId: user.id,
              },
            });
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "PENDING",
        required: false,
      },
      needPassword: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      isDeleted: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      deletedAt: {
        type: "date",
        required: false,
      },
      gender: {
        type: "string",
        required: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      dateOfBirth: {
        type: "date",
        required: false,
      },
    },
  },
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

