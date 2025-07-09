# Frontend - Hello World Task List

This directory contains the frontend application for the Hello World Task List project, built with React and Vite.

## 1. Project Structure

```
frontend/
├── public/
│   └── index.html       # Main HTML file
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx   # Component for adding new tasks
│   │   └── TaskList.jsx   # Component for displaying tasks
│   ├── services/
│   │   └── api.js         # API service for backend communication
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global CSS styles
│   └── main.jsx         # Entry point for the React application
├── .gitignore           # Git ignore rules for frontend
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 2. Setup and Execution Instructions

Follow these steps to set up and run the frontend application locally:

### Prerequisites

*   Node.js (LTS v20.x or v22.x) installed on your machine.
*   npm (v10.x) or Yarn installed.

### Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use). The console will show the exact URL.

2.  **Open your browser:** Navigate to the URL provided in the console to view the application.

### Building for Production

To create a production-ready build of the application:

```bash
npm run build
# or
yarn build
```

This command will generate optimized static assets in the `dist/` directory, which can then be deployed to a static site hosting service.

## 3. Integration with Backend

The frontend application expects the backend API to be running and accessible. The API base URL is configured in `frontend/src/services/api.js`. Ensure this URL points to your running backend instance (e.g., `http://localhost:3000` for local development, or the deployed backend URL).

**API Endpoints Used:**

*   `GET /api/tasks`: To fetch all existing tasks.
*   `POST /api/tasks`: To create a new task.

Refer to the main `architecture/03_Data_Flow_and_Interactions.md` for detailed API specifications.
