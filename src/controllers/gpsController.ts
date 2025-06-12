import { Request, Response } from 'express'
import Cordinate from '../models/Cordinate';
import pool from '../db';
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'alt';


export async function save(req:Request, res:Response) : Promise<any> {
    const {lat, lon, dt_upload} = req.body;

    try{
        const input = await pool.query(
            'INSERT INTO cordinates (lat, lon, dt_upload) VALUES ($1, $2, $3) RETURNING *',
            [lat, lon, dt_upload]
        );

        return res.status(201).json({
            cordinate: new Cordinate(input.rows[0].id, input.rows[0].lat, input.rows[0].lon, input.rows[0].dt_upload)
        });
    }
    catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}