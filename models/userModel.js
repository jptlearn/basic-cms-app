const sequelize = require("../database/dbConfig.js");
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isConfirmed(value) {
          if (value !== this.password) {
            throw new Error("Passwords do not match")
          }
        },
      },
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }

)

module.exports = User;