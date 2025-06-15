import express from 'express';
import cors from 'cors';
import login from './login';
import gps from './gps';
import register from './register';
import home from './home';
import persistence from './persistence';
import devices from './devices';
import { requireAuth } from '../middleware/ authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/register', register);
<<<<<<< HEAD
app.use('/gps', gps)
=======
app.use('/home', requireAuth, home);
app.use('/api/persist', persistence);
app.use('/api/devices', requireAuth, devices);
>>>>>>> 7f6ef80a607e3740b5ff2796972b673224a63a68


export default app
