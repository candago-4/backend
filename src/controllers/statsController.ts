import { Request, Response } from 'express'
import pool from '../db';

export class StatsController {
    public async getStats(req: Request, res: Response): Promise<any> {
        const deviceId = parseInt(req.query.deviceId as string, 10);
        try {
            // query to calculate distance per day using the Haversine formula
            const resultDistMedia = await pool.query(`
                WITH ordered_data AS (
                    SELECT
                    datetime::date AS day,
                    latitude,
                    longitude,
                    LAG(latitude) OVER (PARTITION BY device_id ORDER BY datetime) AS prev_lat,
                    LAG(longitude) OVER (PARTITION BY device_id ORDER BY datetime) AS prev_lon
                    FROM data
                    WHERE device_id = $1
                ),
                distances AS (
                    SELECT
                    day,
                    6371 * 2 * ASIN(
                        SQRT(
                        POWER(SIN(RADIANS(latitude - prev_lat) / 2), 2) +
                        COS(RADIANS(latitude)) * COS(RADIANS(prev_lat)) *
                        POWER(SIN(RADIANS(longitude - prev_lon) / 2), 2)
                        )
                    ) AS distance_km
                    FROM ordered_data
                    WHERE prev_lat IS NOT NULL AND prev_lon IS NOT NULL
                    AND NOT (latitude = prev_lat AND longitude = prev_lon)
                ),
                total_per_day AS (
                    SELECT day, SUM(distance_km) AS total_km
                    FROM distances
                    GROUP BY day
                )
                SELECT ROUND(AVG(total_km)::numeric, 4) AS average_distance_per_day_km
                FROM total_per_day;
                `, [deviceId]);


            const distancesKm = resultDistMedia.rows.map(row => parseFloat(row.average_distance_per_day_km));
            console.log(distancesKm);

            const resultDistTraveled = await pool.query(`
                WITH ordered_data AS (
                    SELECT
                    latitude,
                    longitude,
                    LAG(latitude) OVER (PARTITION BY device_id ORDER BY datetime) AS prev_lat,
                    LAG(longitude) OVER (PARTITION BY device_id ORDER BY datetime) AS prev_lon
                    FROM data
                    WHERE device_id = $1
                ),
                distances AS (
                    SELECT
                    6371 * 2 * ASIN(
                        SQRT(
                        POWER(SIN(RADIANS(latitude - prev_lat) / 2), 2) +
                        COS(RADIANS(latitude)) * COS(RADIANS(prev_lat)) *
                        POWER(SIN(RADIANS(longitude - prev_lon) / 2), 2)
                        )
                    ) AS distance_km
                    FROM ordered_data
                    WHERE prev_lat IS NOT NULL AND prev_lon IS NOT NULL
                    AND NOT (latitude = prev_lat AND longitude = prev_lon)
                )
                SELECT ROUND(SUM(distance_km)::numeric, 4) AS total_distance_km
                FROM distances;
                `, [deviceId]);

                const total = parseFloat(resultDistTraveled.rows[0].total_distance_km);
                console.log(`🚗 Total distance: ${total} km`);

                const resultSpeedAvg = await pool.query(`
                    SELECT ROUND(AVG(speed)::numeric, 2) AS average_speed_kmh
                    FROM data
                    WHERE device_id = $1 AND speed IS NOT NULL;
                    `, [deviceId]);

                const avgSpeed = parseFloat(resultSpeedAvg.rows[0].average_speed_kmh);
                console.log(`🏎️ Média de velocidade: ${avgSpeed} km/h`);


                const resultDownTime = await pool.query(`
                    WITH ordered_times AS (
                        SELECT
                        datetime,
                        LAG(datetime) OVER (PARTITION BY device_id ORDER BY datetime) AS prev_datetime
                        FROM data
                        WHERE device_id = $1
                    ),
                    intervals AS (
                        SELECT
                        EXTRACT(EPOCH FROM (datetime - prev_datetime))/60 AS diff_minutes
                        FROM ordered_times
                        WHERE prev_datetime IS NOT NULL
                    )
                    SELECT
                        ROUND(
                        100.0 * SUM(CASE WHEN diff_minutes > 5 THEN 1 ELSE 0 END)::numeric
                        / COUNT(*), 2
                        ) AS downtime_probability_percent
                    FROM intervals;
                    `, [deviceId]);

                    const downtimeProb = parseFloat(resultDownTime.rows[0].downtime_probability_percent);
                    console.log(`🔴 Downtime probability: ${downtimeProb}%`);

                    const resultPosition = await pool.query(`
                        SELECT latitude, longitude, datetime
                        FROM data
                        WHERE device_id = $1
                        ORDER BY datetime DESC
                        LIMIT 1;
                        `, [deviceId]);

                    if (resultPosition.rows.length > 0) {
                        const { latitude, longitude, datetime } = resultPosition.rows[0];
                        console.log(`📍 Última posição do dispositivo: ${latitude}, ${longitude} em ${datetime}`);
                        } else {
                        console.log("Nenhum dado encontrado para esse dispositivo.");
                        }

                    res.json({
                    averageDistancePerDay: distancesKm[0],
                    totalDistance: total,
                    averageSpeed: avgSpeed,
                    downtimeProbability: downtimeProb,
                    resultPosition: resultPosition.rows.length > 0 ? resultPosition.rows[0] : null
                });

        }
        catch (error) {
            console.error('Error fetching stats:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}