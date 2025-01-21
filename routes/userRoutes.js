const express = require("express");
const { getRegistrationPage, getLoginPage, registerUser, loginUser } = require("../controllers/userController.js");

const router = express.Router();
console.log(router);

router.route("/register").get((req, res) => {
  console.log("registration route accessed");
  getRegistrationPage(req, res);
});

router.route("/login").get((req, res) => {
  console.log("login route accessed");
  getLoginPage(req, res);
});


router.route("/registered").post(registerUser);
router.route("/loggedin").post(loginUser);

module.exports = router;