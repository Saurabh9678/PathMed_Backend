const express = require("express");

const {
  registerHospital,
  loginHospital,
  logoutHospital,
  getHospitalDetailPostman,
  getHospitalDetail
} = require("../controllers/hospitalController");


const router = express.Router()

router.route("/register").post(registerHospital)

router.route("/login").post(loginHospital)

router.route("/logout").get(logoutHospital)

router.route("/detail/:h_id").get(getHospitalDetail);

// For Postman --> All Details
router.route("/all-detail/:h_id").get(getHospitalDetailPostman)

module.exports = router