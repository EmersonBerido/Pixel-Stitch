import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import { Request, Response } from "express";
import { findUserByEmail, addUser, verifyUserCredentials, getIdByEmail, changePasswordByEmail } from "../db/users/users.db";
import { decode } from 'node:punycode';

async function authLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  // Check for valid credentials
  const isValid = await verifyUserCredentials(email, password);
  if (!isValid) return res.status(401).send('Invalid email or password');

  // Get User ID from database
  const userId = await getIdByEmail(email);
  if (!userId) return res.status(500).send('Internal server error');

  // If valid, generate JWT token and return it
  const payload = { id: userId, email : email};
  const token = jwt.sign(payload , process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({token});
}

async function authRegister(req: Request, res: Response) {
  const { email, username, password } = req.body;

  // Check if email already exists
  const emailExists = await findUserByEmail(email);
  if (emailExists) return res.status(409).send('Email already in use');

  // Bcrypt password and save new user to database
  const hashedPassword = await bcryptjs.hash(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
  const insertSuccess = await addUser(email, username, hashedPassword);
  if (!insertSuccess) return res.status(500).send('Internal server error');
  
  res.status(201).send('Successfully registered user');
}

async function authForgotPassword(req: Request, res: Response) {
  
  // Check if email exists in database
  const email = req.body.email;
  const emailExists = await findUserByEmail(email);
  if (!emailExists) return res.status(404).send('Email not found');  

  // Generate password reset token
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  // Send password reset email with nodemailer 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user : process.env.APP_EMAIL,
      pass : process.env.APP_PASSWORD
    }
  });

  // Email options; contain reset link with token query param
  const emailOptions = {
    from : process.env.APP_EMAIL,
    to : email,
    subject : "PIXEL STITCH - Password Reset",
    text : `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}reset-password/${resetToken}`
  }

  // Send email
  try {
    await transporter.sendMail(emailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return res.status(500).send('Error sending email');
  }

  res.send('Forgot password route');
}

async function authResetPassword(req: Request, res: Response) {
  // Get new password from req.body
  let { password } = req.body;
  if (!password) return res.status(400).send('Missing new password');

  // Get token from req.params
  const token = req.params.token;
  if (!token) return res.status(400).send('Missing token');

  // Verify token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decodedToken) return res.status(403).send('Invalid or expired token');

  const email = (decodedToken as any).email;
  password = await bcryptjs.hash(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);

  // Update user's password in database
  const success = await changePasswordByEmail(email, password);
  if (!success) return res.status(500).send('Internal server error');
  
  res.send('Reset password successful');
}

export { authLogin, authRegister, authForgotPassword, authResetPassword };