const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const Prescription = require("../models/prescriptionModel");

const User = require("../models/userModel");

// Add Prescription --> Doctor(POST)
exports.addPrescription = catchAsyncError(async (req, res, next) => {
  const {
    user_id,
    doctor_id,
    hospital_id,
    appointment_id,
    medicines,
    disease,
    tests,
  } = req.body;

  const prescription = await Prescription.create({
    user_id,
    doctor_id,
    hospital_id,
    appointment_id,
    medicines,
    disease,
    tests,
  });

  // Update Prescription Details on User Model
  const user = await User.findById(prescription.user_id);

  user.prescriptions.push({ prescription: prescription._id });
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    prescription,
  });
});

// Get Prescription --> User(GET)
exports.getPrescription = catchAsyncError(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id);
  if (!prescription) {
    return next(new ErrorHandler("No prescription found", 400));
  }

  res.status(200).json({
    success: true,
    prescription,
  });
});

// Update Prescription --> Doctor(PUT)
// Not added the router in doctorRouter.js
exports.updatePrescription = catchAsyncError(async (req, res, next) => {
  const prescription = await Prescription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    prescription: {
      id: prescription._id,
      user_id: prescription.user_id,
      doctor_id: prescription.doctor_id,
      appointment_id: prescription.appointment_id,
      date_of_issue: prescription.date_of_issue,
      medicines: prescription.medicines,
      disease: prescription.disease,
      tests: prescription.tests,
    },
  });
});
