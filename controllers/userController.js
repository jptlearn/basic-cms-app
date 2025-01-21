const bcrypt = require("bcrypt");
const { User } = require("../models/index.js");

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
    res.status(200).json({ message: "User registered successfully" });
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
    // if (match) {
    //   res.json({ message: "User logged in successfully" });
    // }
    if (match) {
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          // Do not send the password
        }
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Error logging user." });
  }
}

module.exports = { getRegistrationPage, getLoginPage, registerUser, loginUser };