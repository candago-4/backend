import { Pool } from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
  user: 'lynch_admin',
  host: 'lynchareadb-container',
  database: 'lynchareadb',
  password: process.env.DB_PASSWORD || '123',
  port: 5432
});

export default pool;
