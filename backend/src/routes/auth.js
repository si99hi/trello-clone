const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_trello_clone';

let transporter;

async function initMailer() {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: process.env.EMAIL_PORT || 587,
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });
  } else {
      console.log('No email credentials found. Generating test account for Nodemailer...');
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
              user: testAccount.user,
              pass: testAccount.pass,
          },
      });
      console.log('Test account info: ', testAccount.user, testAccount.pass);
  }
}
initMailer();

router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (user) {
      // User exists -> prompt for login
      return res.json({ exists: true });
    }

    // User is new -> generate OTP, save to DB, send email
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    // Send email
    if (transporter) {
      const info = await transporter.sendMail({
        from: '"Trello Clone" <noreply@trelloclone.local>',
        to: email,
        subject: "Your Signup Verification Code",
        text: `Your verification code is: ${otp}`,
        html: `<b>Your verification code is: ${otp}</b>`,
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return res.json({ exists: false, message: 'OTP sent to email.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, otp, name, password } = req.body;
  if (!email || !otp || !name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const otpRecord = await prisma.otpVerification.findUnique({ where: { email } });
    if (!otpRecord) {
      return res.status(400).json({ error: 'OTP expired or invalid' });
    }

    if (otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Clean up OTP
    await prisma.otpVerification.delete({ where: { email } });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
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
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // For legacy users without a password
    if (!user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
