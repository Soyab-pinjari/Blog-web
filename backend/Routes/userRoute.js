// GET  /user/profile
// PUT  /user/profile
// POST /user/avatar
// POST /user/follow/:id
// POST /user/unfollow/:id
// GET  /user/blogs/:id

const express = require('express');
const { registration, login } = require('../Controller/authController');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateBanner, updateProfileImage, getProfile, updateProfile, authorInfo } = require('../Controller/userController');
const { profileUpload, bannerUpload } = require('../Config/multer');


router.post('/register',registration);
router.post('/login',login);
router.get('/profile',auth,getProfile);
router.get('/profile/:id',authorInfo);
router.patch('/profile',auth,updateProfile);
router.patch('/profile-image',auth,profileUpload.single("profileImage"),updateProfileImage);
router.patch(
  "/banner",
  auth,
  bannerUpload.single("banner"),
 updateBanner
);



module.exports = router;