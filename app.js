const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

//Route Imports
const userRoutes = require("./routes/userRoute");
const hospitalRoutes = require("./routes/hospitalRoute");
const doctorRoutes = require("./routes/doctorRoute");
const appointmentRoutes = require("./routes/appointmentRoute")


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes)

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
