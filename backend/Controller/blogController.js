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
const Category = require('../Modal/Category')
const uploadToCloudinary = require("../Utils/uploadToCloudinary");
// const slug = slugify(title, {
//   lower: true,
//   strict: true,
// });

const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Check category
        const categoryExists = await Category.findOne({
            slug: category
        });

        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Invalid category",
            });
        }

        // Upload blog cover image to Cloudinary
        const result = await uploadToCloudinary(
            req.file.buffer,
            "blog-app/blogs"
        );

        // Create blog
        let blog = new Blog({
            title,
            content,

            // Save Cloudinary URL
            coverImage: result.secure_url,

            // Save category slug
            category: categoryExists.slug,

            author: req.user.userId
        });

        blog.slug =
            title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-") +
            "-" +
            blog._id;

        const savedBlog = await blog.save();

        return res.status(201).json({
            success: true,
            message: "Blog Created",
            blog: savedBlog,
        });

    } catch (error) {
        console.log("Create blog error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getAllBlog = async(req,res)=>{
    
      console.time("BLOG API");
    try {
        const {category}=req.query;
        const filter = {};
        if(category){
            filter.category=category;
        }
    
        const blogs = await Blog.find(filter).populate("author","username profileImage ").sort({createdAt:-1})
        console.timeEnd("BLOG API");
        res.status(200).json(blogs);
    } catch (error) {
         return res.status(500).json({success:false,message:error.message});
    }
}

const getUserBlog = async(req,res)=>{
     console.time("BLOG API");
    try {
        const blogs = await Blog.find({author:req.user.userId}).populate("author","username profileImage").sort({createdAt:-1});
        res.json(blogs);
        console.timeEnd("BLOG API");
    } catch (error) {
         return res.status(500).json({success:false,message:error.message});
    }
}

const authorBlogs=async(req,res)=>{
    try {
        const blogs = await Blog.find({author:req.params.id}).sort({ createdAt: -1 })
         res.json(blogs);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});
    }
}

// const authorBlogDetails = async(req,res)=>{
//     try {
//         const blog = await Blog.findOne({id:req.params.id}.populate("author","username profileImage"));
//         res.status(200).json(blog);
//         console.log(blog);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"server error"});
//     }
// }

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

const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const searchTerm = q.trim();

    const blogs = await Blog.find({
      $or: [
    {
      title: {
        $regex: searchTerm,
        $options: "i",
      },
    },
    {
      category: {
        $regex: searchTerm,
        $options: "i",
      },
    },
  ],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      blogs
    });

  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
module.exports = {createBlog,getAllBlog,getUserBlog,getBlogInfo,deleteBlog,authorBlogs,searchBlogs};