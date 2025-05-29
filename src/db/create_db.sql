-- Create the role if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'lynch_admin') THEN
      CREATE ROLE lynch_admin WITH LOGIN PASSWORD '@rl3yz1nh4ch@n';
   END IF;
END
$do$;

-- Create the database if it doesn't exist
CREATE DATABASE "lynchareadb"
    WITH
    OWNER = lynch_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1; 