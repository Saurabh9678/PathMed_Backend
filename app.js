const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

//Route Imports
const userRoutes = require("./routes/userRoute");
const hospitalRoutes = require("./routes/hospitalRoute");
const doctorRoutes = require("./routes/doctorRoute");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/doctor", doctorRoutes);

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
