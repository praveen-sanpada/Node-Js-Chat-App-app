require("dotenv").config(".env");

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4'
    },
    pool: { min: 2, max: 100 },
    acquireConnectionTimeout: 60000,
});

module.exports = { knex };