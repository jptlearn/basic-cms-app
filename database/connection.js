const { Sequelize } = require("sequelize");
const { User } = require("../models/index.js")
const sequelize = require("../database/dbConfig.js");

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw error;
  }
}

async function syncModels() {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database models:', error.message);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    await connectToDatabase();
    await syncModels();
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    process.exit(1);
  }
}

module.exports = initializeDatabase;