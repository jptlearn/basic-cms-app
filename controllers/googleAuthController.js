const passport = require("passport");

// Redirects the user to Google's OAuth 2.0 consent screen
const googleAuthRedirect = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

// Handles the Google OAuth callback
const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/auth/user/login" }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/user/login");
    }
    // Successful authentication
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("User from callback: ", user);
      console.log("info from callback: ", info);
      // Redirect to the welcome page or any other page
      res.redirect("/welcomePage");
    });
  })(req, res, next);
};

module.exports = { googleAuthRedirect, googleAuthCallback };
