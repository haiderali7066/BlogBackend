const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

app.use(
  cors({
    origin:
      "https://blog-frontend-c9z7u14q9-haiderali7066s-projects.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
