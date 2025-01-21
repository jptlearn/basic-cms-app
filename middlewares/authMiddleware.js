const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { User } = require("../models/index.js");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"]

  if (!token) {
    return res.json({ message: "No token was provided. Access denied." });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id
      }
    });

    if (user.length == 0) {
      return res.status(403).json("User not found.")
    } else {
      req.userId = user.id;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error while validating token." })
  }



}

module.exports = authMiddleware;