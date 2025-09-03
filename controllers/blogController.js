const Blog = require("../models/Blog");

// ✅ Create Blog (All logged-in users can write)
exports.createBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Login required to write blogs" });
    }

    const blog = await Blog.create({
      ...req.body,
      author: req.user._id,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Blogs (with pagination)
exports.getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(blogs);
  } catch (err) {
    console.error("GET ALL BLOGS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Blog (add view count)
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error("GET SINGLE BLOG ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Blog (Only author or admin)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = blog.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "Not allowed to update this blog" });
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE BLOG ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Blog (Only author or admin)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = blog.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "Not allowed to delete this blog" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("DELETE BLOG ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
