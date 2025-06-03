import { Request, Response } from 'express'
import User from '../models/User';
import pool from '../db';

export class UserController {

    public async getUsers(req: Request, res: Response): Promise<any> {
        try {
            // Fetch all users from the database
            const result = await pool.query('SELECT * FROM users');

            // Map the result to User model instances
            const users = result.rows.map((row: any) => new User(row.id, row.name, row.email, row.password, row.role));

            // Return the users as a JSON response
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    public async createUser(req: Request, res: Response): Promise<any> {
        const { name, email, password, role } = req.body;
        try {
            // Insert the user into the database
            await pool.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', [name, email, password, role]);

            // Return a success response
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    public async updateUser(req: Request, res: Response): Promise<any> {
        const { id, name, email, password, role } = req.body;
        try {
            // Update the user in the database
            await pool.query('UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5', [name, email, password, role, id]);

            // Return a success response
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    public async deleteUser(req: Request, res: Response): Promise<any> {
        const { id } = req.body;
        try {
            // Delete the user from the database
            await pool.query('DELETE FROM users WHERE id = $1', [id]);

            // Return a success response
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}