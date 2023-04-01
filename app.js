const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

//Route Imports
  const userRoutes = require("./routes/userRoute");
  const hospitalRoutes = require("./routes/hospitalRoute");
 


  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/hospital", hospitalRoutes);
  

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
