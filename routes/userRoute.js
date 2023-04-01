const express = require("express");

const {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetail,
  getUserDetailsPostman,
  updateUserDetail
} = require("../controllers/userController");


const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

router.route("/detail/:u_id").get(getUserDetail).put(updateUserDetail)


//postman route only for testing
router.route("/postman/:u_id").get(getUserDetailsPostman)

module.exports = router