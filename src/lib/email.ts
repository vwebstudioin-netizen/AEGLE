import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER || process.env.SMTP_USER.includes("your_")) {
      console.warn("SMTP not configured. Email not sent:", options.subject);
      return false;
    }

    await transporter.sendMail({
      from: `"AEGLE Skin Care Clinic" <${process.env.SMTP_USER}>`,
      ...options,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

// ── Email Templates ──

export function appointmentConfirmationEmail(data: {
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
}): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">✨ AEGLE Skin Care Clinic</h1>
      </div>
      <div style="padding: 32px; background: #fff;">
        <h2 style="color: #1e293b;">Appointment Confirmed</h2>
        <p>Dear ${data.patientName},</p>
        <p>Your appointment has been confirmed with the following details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Doctor</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.doctorName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Department</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.department}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Date</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.date}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Time</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.time}</td></tr>
        </table>
        <p>Please arrive 15 minutes before your scheduled time. Bring a valid ID and insurance card.</p>
      </div>
      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        <p>AEGLE Skin Care Clinic | Koramangala, Bangalore, Karnataka 560034</p>
        <p>Phone: 8050507755 | WhatsApp: +91 8050507755</p>
      </div>
    </div>
  `;
}

export function contactConfirmationEmail(data: {
  name: string;
  subject: string;
}): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">✨ AEGLE Skin Care Clinic</h1>
      </div>
      <div style="padding: 32px; background: #fff;">
        <h2 style="color: #1e293b;">Message Received</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for contacting AEGLE Skin Care Clinic. We have received your message regarding <strong>"${data.subject}"</strong> and will respond within 1-2 business days.</p>
        <p>If this is a medical emergency, please contact us immediately.</p>
      </div>
      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        <p>AEGLE Skin Care Clinic | Koramangala, Bangalore, Karnataka 560034</p>
      </div>
    </div>
  `;
}

export function jobApplicationEmail(data: {
  name: string;
  position: string;
}): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">✨ AEGLE Skin Care Clinic</h1>
      </div>
      <div style="padding: 32px; background: #fff;">
        <h2 style="color: #1e293b;">Application Received</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your interest in the <strong>${data.position}</strong> position at AEGLE Skin Care Clinic.</p>
        <p>Your application has been received and is being reviewed by our recruitment team. We will contact you within 5-7 business days regarding next steps.</p>
      </div>
      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        <p>AEGLE Skin Care Clinic HR Department</p>
      </div>
    </div>
  `;
}

export function donationThankYouEmail(data: {
  name: string;
  amount: string;
  designation?: string;
}): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">✨ AEGLE Skin Care Clinic</h1>
      </div>
      <div style="padding: 32px; background: #fff;">
        <h2 style="color: #1e293b;">Thank You for Your Generous Gift</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your generous donation of <strong>${data.amount}</strong>${data.designation ? ` to ${data.designation}` : ""}.</p>
        <p>Your support helps us advance patient care, fund research, and improve community health programs. This email serves as your donation receipt for tax purposes.</p>
      </div>
      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        <p>AEGLE Skin Care Clinic Foundation | Tax ID: XX-XXXXXXX</p>
      </div>
    </div>
  `;
}

export function paymentReceiptEmail(data: {
  name: string;
  amount: string;
  paymentId: string;
  description: string;
}): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">✨ AEGLE Skin Care Clinic</h1>
      </div>
      <div style="padding: 32px; background: #fff;">
        <h2 style="color: #1e293b;">Payment Receipt</h2>
        <p>Dear ${data.name},</p>
        <p>Your payment has been processed successfully.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Amount</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.amount}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Payment ID</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.paymentId}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Description</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.description}</td></tr>
        </table>
        <p>For billing inquiries, contact our billing department at 8050507755.</p>
      </div>
      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        <p>AEGLE Skin Care Clinic | Billing Department</p>
      </div>
    </div>
  `;
}
