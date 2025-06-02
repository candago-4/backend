import { Request, Response } from 'express'
import User from '../models/User';
import pool from '../db';

export class DataController {

    public async getData(req: Request, res: Response): Promise<any> {
        try {
            // Fetch all users from the database
            const result = await pool.query('SELECT * FROM data WHERE ');

            // Map the result to User model instances
            const users = result.rows.map((row: any) => new User(row.id, row.name, row.email, row.password, row.role));

            // Return the users as a JSON response
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}	