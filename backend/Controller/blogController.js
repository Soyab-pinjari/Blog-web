// createBlog
// getAllBlogs
// getSingleBlog
// updateBlog
// deleteBlog
// getFeaturedBlogs
// getLatestBlogs
// searchBlogs
// getBlogsByCategory

const auth = require('../middleware/auth');
const slugify = require('slugify');
const Blog = require('../Modal/Blog');

// const slug = slugify(title, {
//   lower: true,
//   strict: true,
// });

const createBlog = async(req,res)=>{
  console.log("body---",req.body);
     try {
        const {title,content,category}=req.body;
    
        if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
        let blog =new Blog({
             title,
            content,
            coverImage: req.file.filename,
            category,
            author : req.user.userId
        })
           blog.slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-") +
  "-" +
   blog._id;
    console.log("blog ===", blog);
    const savedBlog = await blog.save();
   console.log(savedBlog);
    return res.status(201).json({
      success: true,
      message: "Blog Created",
      blog: savedBlog,
    });

     } catch (error) {
        return res.status(500).json({success:false,message:error.message});
     }   
}
const getAllBlog = async(req,res)=>{
    try {
        const {category}=req.query;
        const filter = {};
        if(category){
            filter.category=category;

        }
    
        const blogs = await Blog.find(filter).populate("author","username profileImage ").sort({createdAt:-1})
        res.status(200).json(blogs);
    } catch (error) {
         return res.status(500).json({success:false,message:error.message});
    }
}

const getUserBlog = async(req,res)=>{
    try {
        const blogs = await Blog.find({author:req.user.userId}).populate("author","username profileImage").sort({createdAt:-1});
        res.json(blogs);
    } catch (error) {
         return res.status(500).json({success:false,message:error.message});
    }
}
const getBlogInfo = async (req,res)=>{
    try {
           
        const blog = await Blog.findOne ({slug: req.params.slug}).populate("author", "username profileImage ");
        if(!blog){
                return res.status(404).json({
                message: "Blog not found",
                })}
                 res.status(200).json(blog);
    } catch (error) {
          return res.status(500).json({success:false,message:error.message});
    }
} 

const deleteBlog = async (req,res)=>{
    try {
        console.log(req.params);
        const blog = await Blog.findOneAndDelete({slug:req.params.slug});
        if(!blog){
            return res.status(404).json({messsage:'blog not found'})
        }
            res.status(200).json({message:'blog deleted',blog});
    } catch (error) {
         console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }
}



// const updateBlog = async (req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }
module.exports = {createBlog,getAllBlog,getUserBlog,getBlogInfo,deleteBlog,};