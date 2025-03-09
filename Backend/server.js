require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true })); // Allow frontend to make API calls

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// API Routes
app.use("/api/users", userRoutes); // User authentication routes
app.use("/api/transactions", transactionRoutes); // Transaction-related routes

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "🚀 API is running fine!" });
});

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Finance Management System API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
