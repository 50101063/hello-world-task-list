# Database Setup for Hello World Task List

This directory contains the database schema definitions and migration scripts for the "Hello World Task List" application.

## 1. Database Technology

The chosen database technology is **PostgreSQL (v15.x / v16.x)**.

## 2. Schema Definition

The primary table defined in this database is `tasks`.

### `tasks` Table

| Column Name | Data Type              | Constraints                 | Description                                     |
| :---------- | :--------------------- | :-------------------------- | :---------------------------------------------- |
| `id`        | `UUID`                 | `PRIMARY KEY`, `NOT NULL`   | Unique identifier for the task.                 |
| `description` | `TEXT`                 | `NOT NULL`                  | The text content of the task.                   |
| `created_at`  | `TIMESTAMP WITH TIME ZONE` | `NOT NULL`, `DEFAULT NOW()` | Timestamp when the task was created (UTC).      |

## 3. Migration Tool

We use **Knex.js** for managing database migrations. Knex.js is a "batteries included" SQL query builder for PostgreSQL, MySQL, CockroachDB, SQL Server, Oracle, and SQLite3. It provides a programmatic way to define and apply schema changes.

## 4. Setup and Execution Instructions

To set up and run the database migrations, follow these steps:

### Prerequisites

*   **PostgreSQL:** Ensure you have a PostgreSQL server running and accessible.
*   **Node.js & npm:** Ensure Node.js (LTS v20.x or v22.x) and npm are installed.

### 4.1. Database Configuration

The backend application's `knexfile.js` (located in `backend/src/config/knexfile.js`) contains the database connection configuration. You will need to ensure your environment variables are correctly set for the backend to connect to your PostgreSQL instance.

Example environment variables (usually in `backend/.env`):

```
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=hello_world_tasks
```

Make sure your PostgreSQL database (`hello_world_tasks` or whatever you configure `DB_NAME` to be) exists and the `DB_USER` has appropriate permissions to create tables.

### 4.2. Running Migrations

Database migrations are typically run via the backend service, as the `knexfile.js` is part of the backend configuration.

1.  **Navigate to the `backend/` directory:**
    ```bash
    cd backend/
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run migrations:**
    Knex.js commands are usually run via npm scripts defined in `backend/package.json` or directly using `npx knex`. Assuming the backend's `package.json` has a script for migrations:
    ```bash
    # To run all pending migrations
    npm run migrate:latest

    # Or, to run using npx directly (ensure your .env is loaded or variables are set)
    # npx knex migrate:latest --knexfile src/config/knexfile.js
    ```

    *Note: The `src/config/knexfile.js` path is relative to the `backend/` directory.*

### 4.3. Reverting Migrations (Development Only)

For development purposes, you might need to revert migrations.

```bash
# To revert the last batch of migrations
npm run migrate:rollback

# Or using npx directly
# npx knex migrate:rollback --knexfile src/config/knexfile.js
```

### 4.4. Seed Data (Optional)

If seed data is provided in `database/seeds/`, you can run it using:

```bash
# To run all seed files
npm run seed:run

# Or using npx directly
# npx knex seed:run --knexfile src/config/knexfile.js
```

## 5. Ensuring Data Integrity and Performance

*   **Constraints:** The schema defines `PRIMARY KEY` and `NOT NULL` constraints to ensure data integrity.
*   **Data Types:** Appropriate data types (e.g., `TEXT` for descriptions, `TIMESTAMP WITH TIME ZONE` for dates) are used.
*   **Indexing:** PostgreSQL automatically creates an index on the primary key (`id`). For performance, additional indexes can be added on columns frequently used in `WHERE` clauses or `ORDER BY` clauses if performance issues arise (e.g., `created_at` if tasks are often sorted by creation time).
*   **UUID for IDs:** Using UUIDs for `id` helps in distributed environments and prevents sequential ID guessing.
