# Backend

## About

This repository contains the backend code for the Candago-4 project. It is implemented in TypeScript and structured to support the project's server-side functionalities.

## Getting Started

To set up and run this backend project locally, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.19.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/candago-4/backend.git

2. **Navigate to the project directory:**

   ```bash
   cd backend

3. **Install dependences:**

   ```bash
   npm install

4. **Config the .env:**

   ```bash
    PORT=your_available_port_number
    JWT_SECRET=your_jwt_secret

5. **Config the database:**

   If u installed postgreesql with postgres as default superuser
   ```bash
    sudo -u postgres psql
    \i path/to/your/project/src/db/create_db.sql
  
  **Running the application:**

   ```bash
   npm run dev
   ```

**Docker Application:**

Build and run containers
```bash
docker-compose up --build -d
   ```

Check running services:
```bash
docker-compose ps
   ```

Stop containers:
```bash
docker-compose down
   ```

**mqtt topics send example**

```mosquitto_pub -h localhost -t "device/data" -m '{
  "deviceId": "4",
  "gps": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "speed": {
    "value": 55.5,
    "unit": "km/h"
  },
  "timestamp": "2025-06-04 14:30:00"
}'
