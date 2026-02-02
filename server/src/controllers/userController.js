import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateRegister, validateLogin } from '../middleware/validators.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email (mock implementation - replace with actual email service)
const sendOTPEmail = async (email, otp) => {
  try {
    // TODO: Integrate with Nodemailer or other email service
    console.log(`OTP for ${email}: ${otp}`);
    // Example with nodemailer:
    // await transporter.sendMail({
    //   to: email,
    //   subject: 'Your OTP for Email Verification',
    //   html: `Your OTP is: ${otp}. Valid for 10 minutes.`
    // });
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};

// Register user
export const register = async (req, res) => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const existingUser = await User.findOne({ where: { email: value.email } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: ERROR_MESSAGES.USER_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      name: value.name,
      email: value.email,
      password: hashedPassword,
      phone: value.phone || null,
      role: value.role,
      otp,
      otpExpires,
    });

    // Send OTP email
    await sendOTPEmail(user.email, otp);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email with OTP.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    if (user.otpVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    await user.update({
      otpVerified: true,
      emailVerified: true,
      otp: null,
      otpExpires: null,
    });

    res.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    if (user.otpVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({ otp, otpExpires });

    // Send OTP email
    await sendOTPEmail(user.email, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully to your email',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials. Account not found.',
        debug: process.env.NODE_ENV === 'development' ? `No user found with email: ${value.email}` : undefined
      });
    }

    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials. Please check your email and password.',
      });
    }

    if (!user.otpVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email first. Check your email for the OTP.',
        requiresVerification: true,
        email: user.email,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'otp', 'otpExpires'] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, bio, skills, profilePhoto } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (bio) updateData.bio = bio;
    if (skills) updateData.skills = skills;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    await user.update(updateData);

    res.json({
      success: true,
      message: SUCCESS_MESSAGES.PROFILE_UPDATED,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'otp', 'otpExpires'] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
