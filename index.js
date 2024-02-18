const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Database initialization
require("./initDB")();

// CORS configuration
var corsOptions = {
  origin: "*", // Change this to your specific origin(s)
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes or specific routes
app.use(cors(corsOptions));

// Example route without CORS
app.all("/test", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Import and use artwork router
const artworkRouter = require("./src/routes/artworkRouter");
const userRouter = require("./src/routes/userRouter");
app.use("/artwork", artworkRouter);
app.use("/users", userRouter);

// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});