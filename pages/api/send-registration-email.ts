import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const user = process.env.GMAIL_APP_USER;
const pass = process.env.GMAIL_APP_PASSWORD;

if (!user || !pass) {
  throw new Error('GMAIL_APP_USER and GMAIL_APP_PASSWORD must be set in environment variables');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, name } = req.body;
  if (!to || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const mailOptions = {
    from: `SeekGPT Membership <${user}>`,
    to,
    subject: 'Membership Registration Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 32px; border-radius: 8px; max-width: 500px; margin: auto;">
        <h2 style="color: #6366f1;">Welcome to SeekGPT!</h2>
        <p>Dear <b>${name}</b>,</p>
        <p>Thank you for registering for membership. We are excited to have you as part of our community.</p>
        <p style="margin: 24px 0;">Your registration has been received and is being processed. We will contact you soon with more details.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 13px; color: #6b7280;">Best regards,<br/>SeekGPT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email', details: (error as Error).message });
  }
}
