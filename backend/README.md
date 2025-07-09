# Backend for Hello World Task List

This directory contains the Node.js Express backend application for the "Hello World Task List" project. It provides RESTful API endpoints for managing tasks.

## Technologies Used

*   **Node.js**: JavaScript runtime
*   **Express.js**: Web application framework
*   **Knex.js**: SQL query builder for PostgreSQL
*   **Joi**: Schema description and validation
*   **Helmet.js**: Security middleware
*   **Dotenv**: Loads environment variables from a `.env` file

## Setup and Local Execution

Follow these steps to set up and run the backend locally:

### Prerequisites

*   Node.js (LTS v20.x or v22.x)
*   npm (comes with Node.js)
*   PostgreSQL database instance

### 1. Navigate to the Backend Directory

```bash
cd backend/
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory based on `.env.example`.

```
# .env
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/database_name"
# Example: DATABASE_URL="postgresql://postgres:password@localhost:5432/tasklist_db"
```

Replace `user`, `password`, `host`, `port`, and `database_name` with your PostgreSQL database credentials.

### 4. Run Database Migrations

This will create the `tasks` table in your configured PostgreSQL database.

```bash
npx knex migrate:latest --knexfile src/config/knexfile.js
```

### 5. Start the Backend Server

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

### 6. API Endpoints

*   **GET /api/tasks**: Retrieve all tasks.
*   **POST /api/tasks**: Create a new task.
    *   **Request Body (JSON):**
        ```json
        {
            "description": "Your task description here"
        }
        ```

## Docker Setup (Optional)

You can also run the backend using Docker.

### 1. Build the Docker Image

```bash
docker build -t hello-world-task-list-backend .
```

### 2. Run the Docker Container

Ensure your PostgreSQL database is accessible from within the Docker container (e.g., if running locally, use `host.docker.internal` as the host for `DATABASE_URL` or ensure your database is in a Docker network).

```bash
docker run -p 3000:3000 --env-file ./.env hello-world-task-list-backend
```

The backend will be accessible at `http://localhost:3000`.
