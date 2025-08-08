const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

app.use(
  cors({
    origin: "https://blog-frontend-h7yp.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
