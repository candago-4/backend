import { Pool } from 'pg';

const pool = new Pool({
  user: 'lynch_admin',
  host: 'localhost',
  database: 'LynchAreaDB',
  password: '@rl3yz1nh4ch@n',
  port: 5432
});

export default pool;
