import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

function verifyToken(req : Request, res : Response, next : NextFunction) {
  console.log("Verifying token...");
  const header = req.headers["authorization"];

  // token doesnt exist
  if (!header)
    return res.status(403).json({ message: 'Missing token' });

  const token = header.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET as string, (err , user) => {
    // Invalid token
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach decoded user info to request
    console.log("Token verified successfully.");
    next();          // Pass control to the next middleware or route
  });
}

function optionalVerifyToken(req : Request, res : Response, next : NextFunction) {
  console.log("Optionally verifying token...");
  const header = req.headers["authorization"];

  if (!header) {
    console.log("No token provided, proceeding as guest.");
    return next();
  }

  const token = header.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET as string, (err , user) => {
    // Invalid token
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach decoded user info to request
    console.log("Token verified successfully.");
    next();          // Pass control to the next middleware or route
  });
}


export { verifyToken, optionalVerifyToken };