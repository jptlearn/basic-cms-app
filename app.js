const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes.js");
const app = express();

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
  // console.log(userRoutes);
  res.render("homePage")
})

app.use("/auth/user", userRoutes);

module.exports = app;