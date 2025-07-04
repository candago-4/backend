import express from 'express';
import cors from 'cors';
import login from './login';
import gps from './gps';
import register from './register';
import home from './home';
import persistence from './persistence';
import devices from './devices';
import { requireAuth } from '../middleware/authMiddleware';
import validateToken from './validate-token';
import deviceStats from './deviceStats';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/register', register);
app.use('/home', requireAuth, home);
app.use('/api/persist', persistence);
app.use('/api/devices', requireAuth, devices);
app.use('/validate-token', requireAuth, validateToken);
app.use('/api/deviceStats', deviceStats);

export default app;
