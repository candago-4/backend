import { Pool } from 'pg';

const pool = new Pool({
  user: 'lynch_admin',
  host: 'lynchareadb',
  database: 'lynchareadb',
  password: '123',
  port: 5437
});

export default pool;
