const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getMyProfile, updateProfile, getUserPublicProfile } = require('../controllers/userController');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);
router.get('/:id', getUserPublicProfile);

module.exports = router;
