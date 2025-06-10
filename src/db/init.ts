import pool from ".";

const createTables = async () => {
  const query = `
    -- Drop in correct order to avoid foreign key conflicts
    DROP TABLE IF EXISTS data;
    DROP TABLE IF EXISTS devices;
    DROP TABLE IF EXISTS users;

    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(10) NOT NULL
    );

    -- Devices table
    CREATE TABLE IF NOT EXISTS devices (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      user_id INT NOT NULL,
      CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );

    -- Data table
    CREATE TABLE IF NOT EXISTS data (
      id SERIAL PRIMARY KEY,
      device_id INT NOT NULL,
      latitude DOUBLE PRECISION NOT NULL,
      longitude DOUBLE PRECISION NOT NULL,
      speed INT,
      datetime TIMESTAMPTZ NOT NULL,
      CONSTRAINT fk_device
        FOREIGN KEY (device_id)
        REFERENCES devices(id)
        ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ All tables created successfully.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    await pool.end();
  }
};

createTables();
