require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// import routes
const authRoutes = require("./src/routes/auth.routes");

const app = express();

/* -------------------- MIDDLEWARE (ORDER MATTERS) -------------------- */

// ✅ CORS (MUST be first)
app.use(
  cors({
    origin: ["http://localhost:9002", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// allow preflight
app.options("*", cors());

// JSON parser
app.use(express.json());

/* -------------------- DATABASE -------------------- */

connectDB();

/* -------------------- ROUTES -------------------- */

// health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ✅ AUTH ROUTES (THIS WAS MISSING)
app.use("/auth", authRoutes);

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
