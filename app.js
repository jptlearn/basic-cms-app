const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const configurePassport = require("./config/passportConfig.js");
const initializeDatabase = require("./database/connection.js");
const userRoutes = require("./routes/userRoutes.js");
const googleAuthRoutes = require("./routes/googleAuthRoutes.js");
const { sessionConfig } = require("./config/sessionConfig.js");
const authmiddleware = require("./middlewares/authMiddleware.js");

const app = express();

// Middleware setup
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport configuration
configurePassport();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database initialization
initializeDatabase()
  .then(() => console.log("Database initialized successfully!"))
  .catch((error) => console.error("Error initializing the database:", error));

// Routes
app.get("/", (req, res) => res.render("homePage"));
app.get("/welcomePage", authmiddleware, (req, res) => res.render("welcome"));

app.use("/auth/user", userRoutes);
app.use("/auth/google", googleAuthRoutes);

module.exports = app;
