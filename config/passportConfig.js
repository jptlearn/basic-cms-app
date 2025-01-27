const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/index.js");
require("dotenv").config();

function configurePassport() {
  // Configure Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Log the profile for debugging purposes
          console.log("Google Profile:", profile);
          // Check if a user with the given Google ID exists
          let user = await User.findOne({ where: { googleId: profile.id } });
          // If user doesn't exist, create a new one
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              username: profile.displayName || "No Name Provided",
              email: profile.emails?.[0]?.value || "No Email Provided",
              password: null,
            });
          }
          // Authentication successful
          return done(null, user);
        } catch (error) {
          console.error("Error in Google OAuth strategy:", error);
          return done(error, null);
        }
      }
    )
  );

  // Serialize user for session storage
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      console.error("Error in deserializing user:", error);
      done(error, null);
    }
  });
}

module.exports = configurePassport;
