import { baseLayout } from "../layouts/baseLayout";

export interface IVerificationEmailProps {
  name: string;
  url: string;
}

export const renderVerificationEmail = ({
  name,
  url,
}: IVerificationEmailProps) => {
  const content = `
    <h2 style="color: #18181b; margin-top: 0; font-size: 20px; font-weight: 600;">Verify your email address</h2>
    <p style="margin: 16px 0;">Hi <strong>${name}</strong>,</p>
    <p style="margin: 16px 0; color: #3f3f46;">
      Thank you for registering with Doctor Management. Please confirm your email address by clicking the button below:
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${url}" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">
        Verify Email Address
      </a>
    </div>
    <p style="color: #71717a; font-size: 13px; margin: 24px 0 0; word-break: break-all;">
      Or copy and paste this link into your browser:<br/>
      <a href="${url}" style="color: #2563eb; text-decoration: underline;">${url}</a>
    </p>
  `;

  return {
    subject: "Verify your email address - Doctor Management",
    html: baseLayout({ title: "Verify Your Email", content }),
    text: `Hi ${name},\n\nThank you for signing up! Please verify your email address by visiting this URL:\n${url}\n\nIf you did not create an account, please ignore this email.`,
  };
};
