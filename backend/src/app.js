require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());

// CORS configuration
// In a real application, you would restrict this to your frontend's origin:
// const corsOptions = {
//   origin: 'http://your-frontend-domain.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(cors()); // Allow all origins for simplicity in development

// Body Parser Middleware
app.use(express.json());

// API Routes
app.use('/api', taskRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

module.exports = app; // Export for testing
