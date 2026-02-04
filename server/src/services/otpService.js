import nodemailer from 'nodemailer';
import twilio from 'twilio';

/**
 * OTP Service - Handles sending OTP via Email and SMS
 * Requires environment variables:
 * - SMTP_USER: Email address for SMTP
 * - SMTP_PASSWORD: Email password or app-specific password
 * - SMTP_HOST: SMTP server (e.g., smtp.gmail.com)
 * - SMTP_PORT: SMTP port (e.g., 587)
 * - TWILIO_ACCOUNT_SID: Twilio account SID (for SMS)
 * - TWILIO_AUTH_TOKEN: Twilio auth token
 * - TWILIO_PHONE_NUMBER: Twilio phone number to send from
 */

// Initialize Nodemailer transporter
const createEmailTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    return transporter;
  } catch (error) {
    console.error('Error initializing email transporter:', error.message);
    return null;
  }
};

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via Email
export const sendOTPEmail = async (email, otp, userName = 'User') => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('Email service not configured. OTP will be logged to console only.');
      console.log(`\n📧 OTP for ${email}: ${otp}`);
      return true; // Return true to allow registration to proceed
    }

    const transporter = createEmailTransporter();
    if (!transporter) {
      console.warn('Could not create email transporter. Proceeding without email.');
      return true;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Your TrustHire OTP for Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">TrustHire</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Email Verification</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; font-size: 16px; margin: 0 0 20px 0;">
              Hello <strong>${userName}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 14px; margin: 0 0 30px 0;">
              Thank you for registering with TrustHire. To complete your email verification, please use the following One-Time Password (OTP):
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; border: 2px solid #f97316;">
              <div style="font-size: 36px; font-weight: bold; color: #f97316; letter-spacing: 5px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 20px 0; padding: 15px; background: #fef3c7; border-radius: 5px; border-left: 4px solid #fbbf24;">
              ⏱️ <strong>Valid for 10 minutes only.</strong> Do not share this OTP with anyone.
            </p>
            
            <p style="color: #374151; font-size: 14px; margin: 0 0 30px 0;">
              If you did not register for a TrustHire account, please ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
              © 2024 TrustHire. All rights reserved.<br>
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error.message);
    // Return true anyway to not block registration, but log the error
    return true;
  }
};

// Send OTP via SMS (Twilio)
export const sendOTPSMS = async (phoneNumber, otp, userName = 'User') => {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.warn('SMS service not configured. OTP will be logged to console only.');
      console.log(`\n📱 OTP for ${phoneNumber}: ${otp}`);
      return true; // Return true to allow registration to proceed
    }

    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const message = await client.messages.create({
        body: `Your TrustHire OTP is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
      console.log(`✅ OTP SMS sent successfully to ${phoneNumber}. SID: ${message.sid}`);
      return true;
    } catch (smsError) {
      console.error('❌ Error sending OTP SMS via Twilio:', smsError.message || smsError);
      console.log(`📱 OTP (fallback log) for ${phoneNumber}: ${otp}`);
      return true;
    }
  } catch (error) {
    console.error('❌ Error sending OTP SMS:', error.message);
    return true; // Return true anyway to not block registration
  }
};

// Send verification email template
export const sendVerificationEmail = async (email, userName, verificationLink) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log(`📧 Verification link for ${email}: ${verificationLink}`);
      return true;
    }

    const transporter = createEmailTransporter();
    if (!transporter) return true;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to TrustHire - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">TrustHire</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px;">
            <p>Hello ${userName},</p>
            <p>Please click the link below to verify your email:</p>
            <a href="${verificationLink}" style="display: inline-block; background: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Verify Email
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending verification email:', error.message);
    return true;
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, userName) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log(`📧 Welcome email for ${email}`);
      return true;
    }

    const transporter = createEmailTransporter();
    if (!transporter) return true;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to TrustHire!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to TrustHire</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px;">
            <p>Hello ${userName},</p>
            <p>Your account has been successfully created. You can now access all features of TrustHire.</p>
            <p>Best regards,<br>The TrustHire Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    return true;
  }
};
