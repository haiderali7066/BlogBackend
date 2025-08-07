const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { updateUserRole } = require("../controllers/adminController");

const {
  getDashboardData,
  toggleUserBlock,
  deleteAnyPost,
  deleteAnyComment,
} = require("../controllers/adminController");
router.put("/role/:userId", protect, adminOnly, updateUserRole);

router.get("/dashboard", protect, adminOnly, getDashboardData);
router.put("/block/:userId", protect, adminOnly, toggleUserBlock);
router.delete("/post/:blogId", protect, adminOnly, deleteAnyPost);
router.delete("/comment/:commentId", protect, adminOnly, deleteAnyComment);

module.exports = router;
