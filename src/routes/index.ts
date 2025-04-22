import express from 'express';
import cors from 'cors';
import login from './login';
import register from './register'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/register', register);

export default app