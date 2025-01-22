const { Sequelize } = require("sequelize")
const config = require("../config/database.js")
const defineUser = require("./userModel.js")

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
})

const User = defineUser(sequelize)

const models = {
  User,
}

module.exports = {
  sequelize,
  ...models,
}

