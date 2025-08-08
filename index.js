const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: "https://blog-frontend-h7yp.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// Add your routes here
// Example: app.use("/api/auth", require("./routes/auth"));

// ✅ PORT fix for Render
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
