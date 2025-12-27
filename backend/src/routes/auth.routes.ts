import {Router} from 'express';

const router = Router();

router.post('/login', (req, res) => {
  // TODO: Implement login logic
  
  // Get credentials from req.body

  // Validate credentials

  // If invalid, return 401 Unauthorized

  // If valid, generate JWT token and return it
  res.send('Login route');
})

router.post('/register', (req, res) => {
  // TODO: Implement registration logic
  // Get user details from req.body

  // Check if email already exists, return 409 Conflict if so

  // Bcrypt password and save new user to database

  // Return success response

  res.send('Register route');
});

router.post('/forgot-password', (req, res) => {
  // TODO: Implement forgot password logic
  // Get email from req.body

  // Generate password reset token

  // Send password reset email with nodemailer 
  // email should contain a link with the reset token as query param
  res.send('Forgot password route');
})

router.post('/reset-password/:token', (req, res) => {
  // TODO: Implement reset password logic

  // Get new password from req.body and token from req.params
  // Validate token

  // If valid, bcrypt new password and update user record
  res.send('Reset password route');
})

export default router;