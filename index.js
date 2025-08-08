const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS — include preflight support
app.use(
  cors({
    origin: "https://blog-frontend-h7yp.vercel.app",
    credentials: true,
  })
);
app.options("*", cors()); // <- important for preflight support

// Parse incoming JSON
app.use(express.json());

// Debugging middleware (optional but helpful)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ Mount blog routes
app.use("/api/blogs", require("./routes/blogs"));

// Basic health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ message: "Something broke!" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
