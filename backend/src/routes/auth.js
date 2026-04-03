const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_trello_clone';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendOtpEmailSafe({ to, subject, html, devLog }) {
  if (!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)) {
    console.log(devLog);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Taskflow" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Sent OTP email to ${to}`);
  } catch (error) {
    console.error('Email send failed, falling back to dev log:', error.message);
    console.log(devLog);
  }
}

router.post('/start', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.json({ exists: true });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    await sendOtpEmailSafe({
      to: email,
      subject: 'Your Trello Clone Verification Code',
      html: `<p>Your verification code is: <strong>${otp}</strong>.</p><p>It will expire in 10 minutes.</p>`,
      devLog: `[DEV MODE] OTP for ${email}: ${otp}`,
    });

    return res.json({ exists: false, message: 'OTP sent to email.' });
  } catch (error) {
    console.error('Start Auth Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
});

router.post('/verify-setup', async (req, res) => {
  const { email, otp, name, password } = req.body;
  if (!email || !otp || !name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const otpRecord = await prisma.otpVerification.findUnique({ where: { email } });
    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    await prisma.otpVerification.delete({ where: { email } });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Account created successfully', user, token });
  } catch (error) {
    console.error('Verify Setup Error:', error);
    res.status(500).json({ error: 'Error during signup' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'No account found for this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    await sendOtpEmailSafe({
      to: email,
      subject: 'Password reset code',
      html: `<p>Your password reset code is: <strong>${otp}</strong>.</p><p>It will expire in 10 minutes.</p>`,
      devLog: `[DEV MODE] Password reset OTP for ${email}: ${otp}`,
    });

    return res.json({ message: 'Password reset OTP sent to email.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ error: 'Failed to send reset OTP' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) {
    return res.status(400).json({ error: 'Email, OTP and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'No account found for this email' });
    }

    const otpRecord = await prisma.otpVerification.findUnique({ where: { email } });
    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.otpVerification.delete({ where: { email } });
    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;
