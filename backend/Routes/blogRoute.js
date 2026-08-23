// POST   /blog
// GET    /blog
// GET    /blog/:slug
// PUT    /blog/:id
// DELETE /blog/:id
// GET    /blog/featured
// GET    /blog/latest
// GET    /blog/search
// GET    /blog/category/:slug

const express = require('express');
const {createBlog, getAllBlog, getUserBlog, getBlogInfo, deleteBlog, authorBlogs, }= require('../Controller/blogController');
const auth = require('../middleware/auth');
const { blogUpload } = require('../Config/multer');

const router = express.Router();

router.post('/create',auth,blogUpload.single("coverImage"),createBlog);
router.get('/',getAllBlog);
router.get('/user',auth,getUserBlog);
router.get('/author/:id',authorBlogs);
// router.get('/author/:id',authorBlogDetails);
router.get('/:slug',auth,getBlogInfo);
router.delete('/delete/:slug',auth,deleteBlog);
module.exports = router;