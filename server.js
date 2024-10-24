const express = require("express");
const dotenv = require("dotenv");

/**
 * Middlewares
 */
const { notFound, errorHandler } = require("./middlewares/errorsMiddleware");
const { logger } = require("./middlewares/loggerMiddleware");
const { allowCors } = require("./middlewares/corsMiddleware");
const { limiter } = require("./middlewares/rateLimitMiddleware");

/**
 * Routes
 */
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express(); // Body parser to parse JSON requests

// Middleware
app.use(logger); // Logs each request
app.use(allowCors); // Enable CORS
app.use(express.json()); // Body parser
app.use(limiter); // Rate limiting

// Basic route for testing the server
app.get("/health", (req, res) => {
  res.json({ message: "Server is up and running!", status: 200 });
});

// Routes
app.use("/api/products", productRoutes); // Products API
app.use("/api/users", userRoutes); // Users API

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Starting the server and database connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});