import { Request, Response } from 'express'
import pool from '../db';

export class DevicesController {

    public async getDevices(req: Request, res: Response): Promise<any> {
        const user_id = parseInt(req.query.user_id as string, 10);
        console.log("aquiii")
        console.log(user_id, typeof user_id);
        
        try {
            const result = await pool.query('SELECT * FROM devices WHERE user_id = $1', [user_id]);

            return res.status(200).json(result.rows.map((row: any) => ({
                id: row.id,
                name: row.name,
                user_id: row.user_id
            })));
        } catch (error) {
            console.error('Error fetching devices:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async createDevice(req: Request, res: Response): Promise<any> {
        const { user_id, name } = req.query;
        try {   
            await pool.query('INSERT INTO devices (user_id, name) VALUES ($1, $2)', [user_id, name]);

            return res.status(201).json({ message: 'Device created successfully' });
        } catch (error) {
            console.error('Error creating device:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateDevice(req: Request, res: Response): Promise<any> {
        const { id, name, user_id } = req.body;
        try {
            const result = await pool.query('UPDATE devices SET name = $1, user_id = $2 WHERE id = $3', [name, user_id, id]);

            console.log(result.rowCount, 'rows updated');
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Device not found' });
            }
            return res.status(200).json({ message: 'Device updated successfully' });
        } catch (error) {
            console.error('Error updating device:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteDevice(req: Request, res: Response): Promise<any> {
        const { id } = req.query;
        try {
            if (id === undefined) {
                return res.status(400).json({ message: 'Device ID is required' });
            }
            const result = await pool.query('DELETE FROM devices WHERE id = $1', [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Device not found' });
            }
            console.log(result.rowCount, 'rows deleted');
            return res.status(200).json({ message: 'Device deleted successfully' });
        } catch (error) {
            console.error('Error deleting device:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}	