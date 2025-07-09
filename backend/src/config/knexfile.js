require('dotenv').config({ path: '../../.env' }); // Adjust path to .env relative to this file

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: '../db/seeds'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?sslmode=require', // Enforce SSL in production
    migrations: {
      directory: '../db/migrations',
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
