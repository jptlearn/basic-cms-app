const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authMiddleware = require("./middlewares/authMiddleware.js");
const configurePassport = require("./config/passportConfig.js");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes.js");
const { User } = require("./models/index.js");
const app = express();
require("dotenv").config();


const { JWT_SECRET, JWT_EXPIRES_IN, EXPRESS_SESSION_SECRET } = process.env;

app.use(
  session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Prevents creating sessions for unauthenticated users
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production
      maxAge: 1000 * 60 * 60, // 1-hour session
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

configurePassport();

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

// app.get("/logout", (req, res) => {
//   // res.clearCookie('token');
//   res.clearCookie("auth", {
//     path: '/',
//   });
//   res.render("homePage");
// })

app.get("/auth/google",
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: "select_account",
  })
)

app.get("/auth/google/callback",
  passport.authenticate('google', { failureRedirect: "/auth/user/register" }),
  async function (req, res) {
    try {
      let user = await User.findOne({ where: { email: req.user.email } });
      console.log(req.user);
      if (!user) {
        // If the user doesn't exist, register them
        user = await User.create({
          email: req.user.email,
          username: req.user.displayName,
          password: null, // Password is not needed for Google-authenticated users
        });
      }

      const token = jwt.sign(
        { id: req.user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }
      );
      res.cookie("auth", token);
      res.redirect("/welcomepage");
    } catch (error) {
      console.log("Error generating JWT:", error);
      res.redirect("/auth/user/login");
    }
  }
)

app.get("/logout", (req, res) => {
  // Destroy the session stored by Passport (OAuth session)
  req.logout((err) => {
    if (err) return next(err);

    // Clear the JWT cookie
    res.clearCookie("auth", {
      path: '/'
    });

    // Clear the session cookie
    req.session = null;
    res.clearCookie("connect.sid", {
      path: '/'
    }); // Default session cookie name (express-session)

    // Redirect to home page after logout
    res.render("homePage");
  });
});


app.use("/auth/user", userRoutes);

module.exports = app;
