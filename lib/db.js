let pg = require('pg');
let dbParams = {};
let connsString = process.env.DATABASE_URL || "postgres://eqpnqdvfyvuvif:dab8f21be6930f09ad8bddd85114dd080d6590b81f18c7dfe77772ce5cd6aa33@ec2-3-212-194-162.compute-1.amazonaws.com:5432/d1mmk9qmkjjhie";

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionString: connString
}

module.exports = dbParams;
