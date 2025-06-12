-- Create the database if it doesn't exist
CREATE DATABASE "LynchAreaDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Connect to the database
\c "LynchAreaDB"

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

-- Grant privileges to the role
GRANT ALL PRIVILEGES ON DATABASE "LynchAreaDB" TO lynch_admin;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cordinates(
    id SERIAL PRIMARY KEY,
    LAT VARCHAR(6) NOT NULL,
    LON VARCHAR(6) NOT NULL,
    DT_UPLOAD DATETIME
)


-- Grant privileges on users table to lynch_admin
GRANT ALL PRIVILEGES ON TABLE users TO lynch_admin;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO lynch_admin; 