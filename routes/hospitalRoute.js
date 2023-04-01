const express = require("express");

const {
  registerHospital,
  loginHospital,
  logoutHospital,
  getHospitalDetailPostman,
  getHospitalDetail,
} = require("../controllers/hospitalController");

const { getNewAppointment } = require("../controllers/appointmentController");



const router = express.Router();

router.route("/register").post(registerHospital);

router.route("/login").post(loginHospital);

router.route("/logout").get(logoutHospital);

router.route("/detail/:h_id").get(getHospitalDetail);

// For Postman --> All Details
router.route("/all-detail/:h_id").get(getHospitalDetailPostman);

router.route("/apts/:h_id").get(getNewAppointment);

module.exports = router;
