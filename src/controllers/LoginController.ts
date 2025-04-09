import { Request, Response } from 'express'
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';

export async function login(req:Request, res:Response) : Promise<any> {
    const {mail, password} = req.body;

    try{
        // Check if user exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [mail]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create and sign JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

        // Return user data and token
        return res.json({
            user: new User(user.id, user.name, user.email, user.password, user.role),
            token
        });
    }
    catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}