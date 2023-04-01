const express = require("express");

const {
  registerHospital,
  loginHospital,
  logoutHospital,
} = require("../controllers/hospitalController");


const router = express.Router()

router.route("/register").post(registerHospital)

router.route("/login").post(loginHospital)

router.route("/logout").get(logoutHospital)

module.exports = router