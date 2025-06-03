import { Request, Response } from 'express'
import User from '../models/User';
import pool from '../db';

export class DevicesController {

    public async getDevices(req: Request, res: Response): Promise<any> {
        const user_id = req.query
        try {
            // Fetch all devices for the user from the database
            const result = await pool.query('SELECT * FROM devices WHERE user_id = $1', [user_id]);

            // Map the result to User model instances
            const devices = result.rows.map((row: any) => new User(row.id, row.name, row.email, row.password, row.role));

            // Return the devices as a JSON response
            return res.status(200).json(devices);
        } catch (error) {
            console.error('Error fetching devices:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async createDevice(req: Request, res: Response): Promise<any> {
        const { user_id, name } = req.query;
        try {   
            // Insert the device into the database
            await pool.query('INSERT INTO devices (user_id, name) VALUES ($1, $2)', [user_id, name]);

            // Return a success response
            return res.status(201).json({ message: 'Device created successfully' });
        } catch (error) {
            console.error('Error creating device:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}	