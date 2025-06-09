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
    -- Change LC_COLLATE and LC_CTYPE to your desired locale
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1; 