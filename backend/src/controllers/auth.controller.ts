import { Request, Response, NextFunction } from "express";

function authLogin(req: Request, res: Response) {
  // TODO: Implement login logic
  
  // Get credentials from req.body

  // Validate credentials

  // If invalid, return 401 Unauthorized

  // If valid, generate JWT token and return it
  res.send('Login route');
}

function authRegister(req: Request, res: Response) {
  // TODO: Implement registration logic
  // Get user details from req.body

  // Check if email already exists, return 409 Conflict if so

  // Bcrypt password and save new user to database

  // Return success response

  res.send('Register route');
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