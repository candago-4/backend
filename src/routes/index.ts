import express from 'express';
import cors from 'cors';
import login from './login';
import gps from './gps';
import register from './register';
import { requireAuth } from '../middleware/authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/register', register);
app.use('/gps', gps)

app.get('/home', requireAuth, (req, res) => {
res.json({ message: `Welcome ${(req as any).user.username}` });
});

export default app
