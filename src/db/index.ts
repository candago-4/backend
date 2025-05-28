import { Pool } from 'pg';

const pool = new Pool({
  user: 'lynch_admin',
  host: 'localhost',
  database: 'lynchareadb',
  password: 'passwrod',
  port: 5432
});

export default pool;
