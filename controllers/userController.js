const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

dotenv.config();

const getRegistrationPage = (req, res) => {
  console.log("rendering registration")
  res.render("register");
}

const getLoginPage = (req, res) => {
  console.log("rendering login")
  res.render("login");
}

const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password) {
    return res.json({ message: "All fields are required!!" });
  }
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password,
      confirmPassword,
    })
    console.log("new user registered");
    res.redirect("/auth/user/login")
  } catch (error) {
    res.status(500).json({ message: "Error registering user!!" });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Email and Password are required!!" });
  }
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.json({ message: "Invalid email address or password!" });
    }
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })
      res.cookie("auth", token);

      res.redirect("/welcomePage")
    } else {
      res.json({ message: "Invalid login data." })
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging user." });
  }
}



module.exports = { getRegistrationPage, getLoginPage, registerUser, loginUser };