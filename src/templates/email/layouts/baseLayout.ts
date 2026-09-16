interface IBaseLayoutProps {
  title: string;
  content: string;
}

export const baseLayout = ({ title, content }: IBaseLayoutProps): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 32px 16px; color: #18181b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <div style="background-color: #2563eb; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Doctor Management</h1>
    </div>

    <!-- Body Content -->
    <div style="padding: 32px 24px; line-height: 1.6; font-size: 15px;">
      ${content}
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #e4e4e7;">
      <p style="color: #a1a1aa; font-size: 12px; margin: 0 0 6px;">
        This is an automated notification from Doctor Management System.
      </p>
      <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
        If you did not make this request, you can safely disregard this email.
      </p>
    </div>
  </div>
</body>
</html>
`;
