require("dotenv").config();

const sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET || "defaultSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60, // 1-hour session
  },
};

module.exports = { sessionConfig };
