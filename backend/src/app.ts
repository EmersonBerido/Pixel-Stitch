import express from 'express';
import jwt from 'jsonwebtoken';
import cors from "cors";

import {verifyToken} from './middleware/authentication';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import tapestryRoutes from './routes/tapestry.routes';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tapestries', tapestryRoutes);
app.use('/projects', projectRoutes);

app.get('/', (req, res) => {
  console.log('Request received at / endpoint');
  const token = jwt.sign({ id: 123456 }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/testToken', verifyToken, (req, res) => {
  console.log('Request received at /testToken endpoint');
  res.send(`Token is valid. User ID: ${req.user.id}`);
});



export default app;