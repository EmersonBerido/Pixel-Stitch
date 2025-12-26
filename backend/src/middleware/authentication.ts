import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

function verifyToken(req : Request, res : Response, next : NextFunction) {
  const header = req.headers["authorization"];

  // token doesnt exist
  if (!header)
    return res.status(403).json({ message: 'Missing token' });

  const token = header.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET as string, (err , user) => {
    // Invalid token
    if (err) 
      return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // Attach decoded user info to request
    next();          // Pass control to the next middleware or route
  });
}
export { verifyToken };