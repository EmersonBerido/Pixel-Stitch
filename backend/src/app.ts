import express from 'express';
import jwt from 'jsonwebtoken';

import {verifyToken} from './middleware/authentication';



const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  const token = jwt.sign({ id: 123456 }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.send('Hello, World!');
});

app.get('/testToken', verifyToken, (req, res) => {
  res.send(`Token is valid. User ID: ${req.user.id}`);
});



export default app;