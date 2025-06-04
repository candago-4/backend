import { Request, Response } from 'express'
import User from '../models/User';
import pool from '../db';

export class DataController {

    public async getData(req: Request, res: Response): Promise<any> {
        const device_id = req.query
        try {
            // Fetch all users from the database
            const result = await pool.query('SELECT * FROM data WHERE device_id = $1', [device_id]);

            // Map the result to User model instances
            const users = result.rows.map((row: any) => new User(row.id, row.name, row.email, row.password, row.role));

            // Return the users as a JSON response
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async persistData(req: Request, res: Response): Promise<any> {
        const { device_id, data } = req.body;
        try {   
            // Insert the data into the database
            await pool.query('INSERT INTO data (device_id, data) VALUES ($1, $2)', [device_id, data]);

            // Return a success response
            return res.status(201).json({ message: 'Data persisted successfully' });
        } catch (error) {
            console.error('Error persisting data:', error);
            return res.status(500).json({ message: 'Server error' });
        }

    }
}	