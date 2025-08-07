const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  isBlocked: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user", "editor", "admin"],
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
