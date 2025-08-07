const User = require("../models/User");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment"); // ✅ UNCOMMENT this line

// 📊 Get all data for admin dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const blogs = await Blog.find().populate("author", "username");
    const comments = await Comment.find().populate("user", "username");

    res.json({ users, blogs, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🚫 Block/Unblock any user
exports.toggleUserBlock = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}` });
};

// ✅ Update user role (user ↔ editor ↔ admin)
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  if (!["user", "editor", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json({ message: `User role updated to ${role}` });
};

// ❌ Delete any blog post
exports.deleteAnyPost = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.blogId);
  res.json({ message: "Post deleted" });
};

// ❌ Delete any comment
exports.deleteAnyComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.json({ message: "Comment deleted" });
};
