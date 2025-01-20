const express = require("express");
const app = express();

const initializeDatabase = require('./database/connection.js');

initializeDatabase().then(() => {
  console.log("Database initialized successfully!");
}).catch((error) => {
  console.error("Error initializing the database!");
})

module.exports = app;