const bcrypt = require("bcrypt");
const sequelize = require("../database/dbConfig.js");
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [3, 50],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
      type: DataTypes.VIRTUAL,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = user.password.trim();
        user.confirmPassword = user.confirmPassword.trim();
        // Compare password and confirmPassword before creation
        if (user.confirmPassword !== user.password) {
          throw new Error("Passwords do not match");
        }
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: (user, options) => {
        // Compare password and confirmPassword before updating
        if (user.confirmPassword && user.confirmPassword !== user.password) {
          throw new Error("Passwords do not match");
        }
      },
    },
  }
);

module.exports = User;
