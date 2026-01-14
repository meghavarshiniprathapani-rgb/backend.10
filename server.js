require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Import routes
const authRoutes = require("./src/routes/auth.routes");

const app = express();

/* -------------------- MIDDLEWARE (ORDER MATTERS) -------------------- */

// ✅ CORS (Railway + Local Safe)
app.use(
  cors({
    origin: "*", // allow all origins (safe for APIs)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// JSON parser
app.use(express.json());

/* -------------------- DATABASE -------------------- */

connectDB();

/* -------------------- ROUTES -------------------- */

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "🚀 Backend API is running",
  });
});

// Auth routes
app.use("/auth", authRoutes);

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
