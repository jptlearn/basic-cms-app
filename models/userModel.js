const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")

const User = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [3, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [6, 100],
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        allowNull: true,
        validate: {
          isConfirmed(value) {
            if (this.password && value !== this.password) {
              throw new Error("Passwords do not match")
            }
          },
        },
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      tableName: "users",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = user.password.trim()
            user.password = await bcrypt.hash(user.password, 10)
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password") && user.password) {
            user.password = user.password.trim()
            user.password = await bcrypt.hash(user.password, 10)
          }
        },
      },
    },
  )

  User.prototype.validatePassword = async function (password) {
    return this.password ? bcrypt.compare(password, this.password) : false
  }

  return User
}

module.exports = User

