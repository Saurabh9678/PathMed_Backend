const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

//Route Imports
  //const userRoutes = require("./routes/userRoute");
 


  //app.use("/api/v1/user", userRoutes);
  

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
