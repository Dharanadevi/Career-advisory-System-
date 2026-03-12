import nodemailer from 'nodemailer';

export const sendApplicationEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use Gmail App Password
    }
  });

  const htmlContent = `
    <div style="background: #020617; color: white; padding: 40px; border-radius: 20px; font-family: sans-serif;">
      <h1 style="color: #0ea5e9;">Application Verified</h1>
      <p>Hello ${data.name},</p>
      <p>Your application for <strong>${data.role}</strong> at <strong>${data.company}</strong> has been received.</p>
      <div style="border: 1px solid #0ea5e9; padding: 15px; border-radius: 10px; margin-top: 20px;">
        <span style="color: #0ea5e9;">Status:</span> In Review
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"CareerPath AI" <noreply@careerpath.com>',
    to: data.email,
    subject: `Application Success: ${data.role}`,
    html: htmlContent
  });
};