
let dbConfig = {};
if (process.env.DATABASE_URL) {
  dbConfig.connectionString = process.env.DATABASE_URL;
  dbConfig.ssl = { rejectUnauthorized: false };
} else {
  dbConfig = {
    user: process.env.DB_USER || "vagrant",
    password: process.env.DB_PASS || "123",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "loan-payment",
    port: process.env.DB_PORT || 5432,
    ssl: {
      rejectUnauthorized: false
    }
  };
}

module.exports = dbConfig;

