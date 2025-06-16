import { Pool } from 'pg';

const pool = new Pool({
  user: 'lynch_admin',
  host: 'lynchareadb-container',
  database: 'lynchareadb',
  password: 'arleyzinha_safadinha',
  port: 5432
});

export default pool;
