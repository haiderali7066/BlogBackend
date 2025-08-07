const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
