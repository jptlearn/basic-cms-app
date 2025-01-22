const dotenv = require("dotenv");

dotenv.config()

const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "your_database_name",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: console.log,
  },
  test: {
    username: process.env.TEST_DB_USERNAME || "root",
    password: process.env.TEST_DB_PASSWORD || "",
    database: process.env.TEST_DB_NAME || "your_test_database_name",
    host: process.env.TEST_DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: "mysql",
    logging: false,
  },
}

const env = process.env.NODE_ENV || "development"

module.exports = config[env];

