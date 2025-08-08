const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for local frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "https://blog-frontend-h7yp.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

// Logging requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Blog routes
app.use("/api/blogs", require("./routes/blogRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.send("API is running locally...");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running locally on http://localhost:${PORT}`);
});
