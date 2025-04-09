import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'LynchAreaDB',
  password: '@rleyzinhach4n',
  port: 5432
});

export default pool;
