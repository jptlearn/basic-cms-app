require("dotenv").config();

const sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET || "defaultSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1-hour session
  },
};

module.exports = { sessionConfig };
