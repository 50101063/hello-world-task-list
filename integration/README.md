# Integration Guide for Hello World Task List

This document provides comprehensive instructions for setting up, running, and understanding the integrated "Hello World Task List" application, which comprises a React frontend, a Node.js/Express backend, and a PostgreSQL database.

## Table of Contents

1.  [Overview](#1-overview)
2.  [Prerequisites](#2-prerequisites)
3.  [Manual Setup and Run](#3-manual-setup-and-run)
    *   [3.1. Database Setup](#31-database-setup)
    *   [3.2. Backend Setup and Run](#32-backend-setup-and-run)
    *   [3.3. Frontend Setup and Run](#33-frontend-setup-and-run)
4.  [Running with Docker Compose (Recommended)](#4-running-with-docker-compose-recommended)
    *   [4.1. Setup .env for Docker Compose](#41-setup-env-for-docker-compose)
    *   [4.2. Build and Run](#42-build-and-run)
    *   [4.3. Accessing the Application](#43-accessing-the-application)
    *   [4.4. Stopping Services](#44-stopping-services)
5.  [Integration Points and APIs](#5-integration-points-and-apis)
6.  [Troubleshooting](#6-troubleshooting)

---

## 1. Overview

This project demonstrates a simple task management application with a clear separation of concerns across three main components:

*   **Frontend:** A React application providing the user interface.
*   **Backend:** A Node.js/Express API serving task data.
*   **Database:** A PostgreSQL instance for persistent data storage.

This guide focuses on how these components are integrated and how to run the complete system.

## 2. Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Git:** For cloning the repository.
*   **Node.js (LTS recommended):** For running frontend and backend applications manually.
*   **npm (Node Package Manager):** Comes with Node.js.
*   **Docker Desktop:** Includes Docker Engine and Docker Compose, essential for the recommended setup.

## 3. Manual Setup and Run

This section details how to set up and run each component individually.

### 3.1. Database Setup

1.  **Install PostgreSQL:** If you don't have Docker, you'll need a local PostgreSQL installation.
2.  **Create Database and User:**
    *   Access your PostgreSQL client (e.g., `psql`).
    *   Create a database and a user for the application.
        ```sql
        CREATE USER task_user WITH PASSWORD 'task_password';
        CREATE DATABASE task_list_db OWNER task_user;
        GRANT ALL PRIVILEGES ON DATABASE task_list_db TO task_user;
        ```
    *   *Note: Replace `task_user` and `task_password` with strong, unique credentials for production.*
3.  **Run Migrations:**
    *   Navigate to the `backend/` directory:
        ```bash
        cd backend
        ```
    *   Create a `.env` file in `backend/` with your database connection details:
        ```
        # backend/.env
        DATABASE_URL="postgresql://task_user:task_password@localhost:5432/task_list_db"
        PORT=3000
        ```
    *   Install backend dependencies:
        ```bash
        npm install
        ```
    *   Run database migrations using Knex:
        ```bash
        npx knex migrate:latest
        ```
        This will create the `tasks` table in your `task_list_db` database.

### 3.2. Backend Setup and Run

1.  **Navigate to Backend Directory:**
    ```bash
    cd backend
    ```
2.  **Ensure `.env` exists:** (As created in Database Setup step 3.1)
    ```
    # backend/.env
    DATABASE_URL="postgresql://task_user:task_password@localhost:5432/task_list_db"
    PORT=3000
    ```
3.  **Install Dependencies:** (Already done if you ran migrations)
    ```bash
    npm install
    ```
4.  **Run the Backend Server:**
    ```bash
    npm start
    ```
    The backend API should now be running on `http://localhost:3000`.

### 3.3. Frontend Setup and Run

1.  **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```
2.  **Create `.env` file:**
    *   Create a `.env` file in `frontend/` to configure the API base URL.
        ```
        # frontend/.env
        VITE_API_BASE_URL=http://localhost:3000/api
        ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Run the Frontend Application:**
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another port Vite chooses).

## 4. Running with Docker Compose (Recommended)

Docker Compose allows you to run all three services (database, backend, frontend) with a single command, ensuring a consistent and isolated environment.

### 4.1. Setup .env for Docker Compose

Create a `.env` file in the **root directory of the project** (e.g., `hello-world-task-list/.env`). This file will provide environment variables for the Docker Compose setup.

```
# .env (in the project root: hello-world-task-list/)
DB_NAME=task_list_db
DB_USER=task_user
DB_PASSWORD=task_password
```
*Note: These credentials are used by Docker Compose to set up the PostgreSQL container and for the backend to connect to it. For production, use stronger, randomly generated passwords.*

### 4.2. Build and Run

1.  **Navigate to the `integration/` directory:**
    ```bash
    cd integration
    ```
2.  **Build and start all services:**
    ```bash
    docker compose up --build -d
    ```
    *   `--build`: Builds images for services that have a `build` instruction (frontend, backend).
    *   `-d`: Runs containers in detached mode (in the background).

    Docker Compose will:
    *   Pull the PostgreSQL image.
    *   Build the backend Docker image from `backend/Dockerfile`.
    *   Build the frontend Docker image from `frontend/Dockerfile`.
    *   Start the database container, wait for it to be healthy.
    *   Start the backend container, run migrations, and then start the Node.js server.
    *   Start the frontend container and serve the React app.

3.  **Check Service Status (Optional):**
    ```bash
    docker compose ps
    ```
    You should see `Up (healthy)` for `database` and `Up` for `backend` and `frontend`.

### 4.3. Accessing the Application

*   **Frontend:** Open your web browser and navigate to `http://localhost:80` (or simply `http://localhost`).
*   **Backend API:** The backend API is accessible internally within the Docker network at `http://backend:3000`. If you need to test it directly from your host, it's exposed at `http://localhost:3000`.

### 4.4. Stopping Services

To stop and remove all services, networks, and volumes created by `docker compose up`:

```bash
docker compose down -v
```
*   `-v`: Removes named volumes (`db_data` in this case), which will delete your database data. Omit `-v` if you want to keep the data.

## 5. Integration Points and APIs

The core integration occurs via RESTful API calls from the Frontend to the Backend.

*   **Frontend (`frontend/src/services/api.js`):**
    *   Makes `GET` requests to `/api/tasks` to fetch all tasks.
    *   Makes `POST` requests to `/api/tasks` to create new tasks.
    *   The base URL for these requests is configured via `VITE_API_BASE_URL` (e.g., `http://localhost:3000/api`).
*   **Backend (`backend/src/routes/tasks.js`, `backend/src/controllers/tasks.js`):**
    *   Defines the `/api/tasks` endpoint.
    *   Handles incoming requests, validates data (`backend/src/middlewares/validation.js`).
    *   Interacts with the database via `backend/src/models/Task.js` and Knex.js (`backend/src/utils/db.js`).
*   **Database (`database/migrations/`):**
    *   The `tasks` table is created by the `001_create_tasks_table.js` migration script.
    *   The backend connects to PostgreSQL using the `DATABASE_URL` environment variable.

## 6. Troubleshooting

*   **"Error: connect ECONNREFUSED 127.0.0.1:5432" (Backend to DB):**
    *   Ensure your PostgreSQL database is running and accessible on port 5432.
    *   Check your `DATABASE_URL` in `backend/.env` (manual setup) or `DB_USER`/`DB_PASSWORD`/`DB_NAME` in `project_root/.env` (Docker Compose).
    *   If using Docker Compose, ensure the `database` service is healthy (`docker compose ps`).
*   **"Network Error" or "Failed to fetch" (Frontend to Backend):**
    *   Ensure your backend server is running on `http://localhost:3000`.
    *   Check `VITE_API_BASE_URL` in `frontend/.env` (manual setup) or `VITE_API_BASE_URL` in `integration/docker-compose.yml` (Docker Compose).
    *   Check browser console for CORS errors. Ensure backend CORS configuration allows requests from your frontend's origin.
*   **Docker Compose issues:**
    *   Ensure Docker Desktop is running.
    *   Check logs for specific services: `docker compose logs <service_name>` (e.g., `docker compose logs backend`).
    *   Try rebuilding images: `docker compose build --no-cache`.
    *   Clean up old containers/volumes: `docker compose down -v`.
