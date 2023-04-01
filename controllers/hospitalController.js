const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Hospital = require("../models/hospitalModel");
const sendToken = require("../utils/jwtToken");

// Register a hospital
exports.registerHospital = catchAsyncError(async (req, res, next) => {
  const { name, email, password, gst_in } = req.body;

  const hospital = await Hospital.create({
    name,
    email,
    password,
    gst_in,
  });

  sendToken(hospital, 201, res);
});

// Login Hospital
exports.loginHospital = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const hospital = await Hospital.findOne({ email }).select("+password");

  if (!hospital) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await hospital.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(hospital, 200, res);
});

// Logout Hospital
exports.logoutHospital = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
