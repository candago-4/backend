import { Request, Response } from 'express'
import User from '../models/User';
import bcrypt from 'bcryptjs';
import pool from '../db';

export async function register(req:Request, res:Response) : Promise<any> {
    const {name, mail, password, role} = req.body;

    try{
        // Check if user already exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [mail]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, mail, hashedPassword, role]
        );

        return res.status(201).json({
            user: new User(newUser.rows[0].id, newUser.rows[0].name, newUser.rows[0].email, newUser.rows[0].password, newUser.rows[0].role)
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}