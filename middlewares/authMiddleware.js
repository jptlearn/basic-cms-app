const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { User } = require("../models/index.js");

const authMiddleware = async (req, res, next) => {
  // First, try to get the token from connect.sid (session-based authentication)
  const sessionToken = req.cookies["connect.sid"];

  // If no session token, check for JWT token in the "auth" cookie
  const jwtToken = req.cookies["auth"];
  const token = sessionToken || jwtToken; // use either the session or JWT token if available

  if (!token) {
    return res.status(401).json({ message: "No token provided. Access denied." });
  }

  try {
    let decoded;

    // If the token is from session (connect.sid), the verification might be handled by Passport automatically
    if (sessionToken) {
      // In case of session-based auth, no decoding of token is required here
      // You can check for the session ID if Passport handles session authentication
      // Passport will populate req.user automatically if session is valid.
      if (!req.user) {
        return res.status(401).json({ message: "No user session found. Please login again." });
      }

      req.userId = req.user.id; // Passport will already set user info
      return next();
    }

    // If the token is a JWT token (from auth cookie), decode it manually
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(403).json({ message: "User not found." });
    }

    req.userId = user.id; // Set userId for later use in route
    next();
  } catch (error) {
    console.error("Error while validating token:", error);
    return res.status(500).json({ message: "Error while validating token." });
  }
};

module.exports = authMiddleware;