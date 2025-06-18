import { Pool } from 'pg';

const pool = new Pool({
  user: 'lynch_admin',
  host: 'lynchareadb-container',
  database: 'lynchareadb',
  password: 'password',
  port: 5432
});

export default pool;
