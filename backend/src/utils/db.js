const knexConfig = require('../config/knexfile');
const knex = require('knex');

// Determine the environment (development or production)
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

if (!config) {
  console.error(`Knex configuration for environment "${environment}" not found.`);
  process.exit(1);
}

const db = knex(config);

// Optional: Test database connection on startup
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit process if database connection fails
  });

module.exports = db;
