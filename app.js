const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware.js");
const userRoutes = require("./routes/userRoutes.js");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

const initializeDatabase = require('./database/connection.js');

initializeDatabase().then(() => {
  console.log("Database initialized successfully!");
}).catch((error) => {
  console.error("Error initializing the database!");
})

app.get("/", (req, res) => {
  console.log("home page router accessed")
  res.render("homePage")
})

app.get("/welcomePage", authMiddleware, (req, res) => {
  res.render("welcome");
})

app.get("/logout", (req, res) => {
  // res.clearCookie('token');
  res.clearCookie("auth", {
    path: '/',
  });
  res.render("homePage");
})

app.use("/auth/user", userRoutes);

module.exports = app;