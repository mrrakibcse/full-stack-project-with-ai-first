import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import config from "../config/env";
import { sendEmail } from "../utils/sendEmail";

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
      await sendEmail({
        to: user.email,
        subject: "Verify your email address - Doctor Management",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2563eb;">Welcome to Doctor Management</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verify Email</a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser: <br/><a href="${url}" style="color: #2563eb;">${url}</a></p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 12px;">If you did not create an account, please ignore this email.</p>
          </div>
        `,
      });
    },
  },
});

