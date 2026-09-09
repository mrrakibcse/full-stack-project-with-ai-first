import nodemailer from "nodemailer";
import config from "../config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

interface ISendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: ISendEmailOptions) => {
  const info = await transporter.sendMail({
    from: config.smtpFrom,
    to,
    subject,
    html,
  });
  return info;
};
