import { Request, Response } from 'express'
import pool from '../db';

export class DataController {

    public async getData(req: Request, res: Response): Promise<any> {
        const userID = parseInt(req.query.userID as string, 10);
        try {
            const result = await pool.query('SELECT data.* FROM data JOIN devices ON data.device_id = devices.id WHERE devices.user_id = $1;', [userID]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No data found for this device' });
            }
            
            return res.status(200).json(result.rows.map((row: any) => ({
                id: row.id,
                device_id: row.device_id,
                latitude: row.latitude,
                longitude: row.longitude,
                speed: row.speed,
                datetime: row.datetime
            })));
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async persistData(req: Request, res: Response): Promise<any> {
        const { deviceId, latitude, longitude, speed, datetime } = req.body;
        try {   
            await pool.query('INSERT INTO data (device_id, latitude, longitude, speed, datetime) VALUES ($1, $2, $3, $4, $5)', [deviceId, latitude, longitude, speed, datetime]);

            return res.status(201).json({ message: 'Data persisted successfully' });
        } catch (error) {
            console.error('Error persisting data:', error);
            return res.status(500).json({ message: 'Server error' });
        }

    }
}	