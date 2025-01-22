const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models");

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

//* Redirects the user to Google's OAuth 2.0 consent screen
const googleAuthRedirect = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});


// Handles the Google OAuth callback, checks/creates the user, and generates a JWT

const googleAuthCallback = async (req, res) => {
  try {
    // Check if user exists in the database
    let user = await User.findOne({ where: { email: req.user.email } });

    if (!user) {
      // If user doesn't exist, create a new record
      user = await User.create({
        email: req.user.email,
        username: req.user.displayName,
        password: null, // No password for Google-authenticated users
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Set the JWT as a cookie
    res.cookie("auth", token);

    // Redirect to the welcome page
    res.redirect("/welcomePage");
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);

    // Redirect to the login page on error
    res.redirect("/auth/user/login");
  }
};

module.exports = { googleAuthRedirect, googleAuthCallback };

