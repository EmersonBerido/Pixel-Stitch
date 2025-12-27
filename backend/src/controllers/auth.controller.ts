import { Request, Response } from "express";
import bcrpytjs from 'bcryptjs';
import { findUserByEmail, addUser } from "../db/users/users.db";

function authLogin(req: Request, res: Response) {
  // TODO: Implement login logic
  
  // Get credentials from req.body

  // Validate credentials

  // If invalid, return 401 Unauthorized

  // If valid, generate JWT token and return it
  res.send('Login route');
}

async function authRegister(req: Request, res: Response) {
  const { email, username, password } = req.body;

  // Check if email already exists
  const emailExists = await findUserByEmail(email);
  if (emailExists) return res.status(409).send('Email already in use');

  // Bcrypt password and save new user to database
  const hashedPassword = await bcrpytjs.hash(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
  const insertSuccess = await addUser(email, username, hashedPassword);
  if (!insertSuccess) return res.status(500).send('Internal server error');
  
  res.status(201).send('Successfully registered user');
}

function authForgotPassword(req: Request, res: Response) {
  // TODO: Implement forgot password logic
  // Get email from req.body

  // Generate password reset token

  // Send password reset email with nodemailer 
  // email should contain a link with the reset token as query param
  res.send('Forgot password route');
}

function authResetPassword(req: Request, res: Response) {
  // TODO: Implement reset password logic

  // Get new password from req.body and token from req.params
  // Validate token

  // If valid, bcrypt new password and update user record
  res.send('Reset password route');
}

export { authLogin, authRegister, authForgotPassword, authResetPassword };