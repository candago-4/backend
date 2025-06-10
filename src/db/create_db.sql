-- Create the role if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'lynch_admin') THEN
      CREATE ROLE lynch_admin WITH LOGIN PASSWORD '123';
   END IF;
END
$do$;

-- Create the database if it doesn't exist
CREATE DATABASE "lynchareadb"
    WITH
    OWNER = lynch_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1; 