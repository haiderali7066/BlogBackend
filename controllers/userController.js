const User = require('../models/User');
const Blog = require('../models/Blog');

exports.getMyProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const blogs = await Blog.find({ author: req.params.id });
    res.json({ user, blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
