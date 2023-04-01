const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Hospital = require("../models/hospitalModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");

//Make appointment --USER
exports.reqAppointment = catchAsyncError(async (req, res, next) => {
  const { h_id, u_id, appointment_date } = req.body;
  const hospital_id = new mongoose.Types.ObjectId(h_id);
  const user_id = new mongoose.Types.ObjectId(u_id);

  const appointment = await Appointment.create({
    hospital_id,
    user_id,
    appointment_date,
  });

  const user = await User.findById(user_id);
  user.req_appointments.push({ req_appt: appointment._id });

  const hospital = await Hospital.findById(hospital_id);

  hospital.new_appoinments.push({ apt_id: appointment._id });

  await user.save({ validateBeforeSave: false });
  await hospital.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment request success",
  });
});

//Change status of appointment (accept/reject) --Management
exports.resToAppointment = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.apt_id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  //if accepted
  if (status === "A") {
    const user = await User.findById(appointment.user_id);
    user.appointments.push({ acpt_appointment: appointment._id });

    const req_appointments = user.req_appointments.filter(
      (apt) => apt.req_appt.toString() !== appointment._id.toString()
    );
    user.req_appointments = req_appointments;

    const hospital = await Hospital.findById(appointment.hospital_id);

    hospital.accepted_appointments.push({ acpt_apt_id: appointment._id });

    const new_appoinments = hospital.new_appoinments.filter(
      (apt) => apt.apt_id.toString() !== appointment._id.toString()
    );
    hospital.new_appoinments = new_appoinments;

    // Add the accepted appointment's id to the doctor's model
    // const acptdApt = await Appointment.findById(appointment._id);
    // const assignedDoctor = await Doctor.findById(acptdApt.doctor_id);
    // assignedDoctor.allAppointments.push({ appointment: appointment._id });

    await user.save({ validateBeforeSave: false });
    await hospital.save({ validateBeforeSave: false });
    //await assignedDoctor.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      appointment,
      message: "Appointment Accepted",
    });
  } else if (status === "R") {
    const user = await User.findById(appointment.user_id);

    const req_appointments = user.req_appointments.filter(
      (apt) => apt.req_appt.toString() !== appointment._id.toString()
    );
    user.req_appointments = req_appointments;

    const hospital = await Hospital.findById(appointment.hospital_id);

    const new_appoinments = hospital.new_appoinments.filter(
      (apt) => apt.apt_id.toString() !== appointment._id.toString()
    );
    hospital.new_appoinments = new_appoinments;

    await user.save({ validateBeforeSave: false });
    await hospital.save({ validateBeforeSave: false });
    await Appointment.findByIdAndDelete(req.params.apt_id);
    res.status(200).json({
      success: true,
      message: "Appointment Rejected",
    });
  }
});

// Get Appointments
exports.getAppointment = catchAsyncError(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("No appointment found", 400));
  }

  res.status(200).json({
    success: true,
    appointment,
  });
});

