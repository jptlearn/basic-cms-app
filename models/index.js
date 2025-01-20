const User = require("./userModel.js");
const sequelize = require("../database/dbConfig.js");

const db = {
  User,
  sequelize
}

module.exports = db;