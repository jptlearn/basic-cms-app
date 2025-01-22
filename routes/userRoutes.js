const express = require("express");
const { getRegistrationPage, getLoginPage, registerUser, loginUser, logout } = require("../controllers/userController.js");

const router = express.Router();
console.log(router);

router.route("/register").get(getRegistrationPage);

router.route("/login").get(getLoginPage);

router.route("/registered").post(registerUser);

router.route("/loggedin").post(loginUser);

router.route("/logout").get(logout);

module.exports = router;