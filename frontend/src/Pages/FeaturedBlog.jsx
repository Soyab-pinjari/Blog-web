import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetAllBlogs } from '../services/api'
import { data, Link } from 'react-router';


function FeaturedBlog() {
    const [blogs,setBlogs]=useState([]);
   
  const fetchBlogs = async()=>{
    const data = await GetAllBlogs();
    console.log("GetAllBlogs data",data);
  const formattedBlogs = data.map((blog) => ({
    ...blog,
    createdAt: new Date(blog.createdAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  setBlogs(formattedBlogs);
}
  useEffect(()=>{
    fetchBlogs();
  },[])
console.log("FeaturedBlog State:", blogs);
  return (
    <>

   <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Blogs
        </h2>

        <button className="text-indigo-600 font-medium hover:text-indigo-800 transition">
          <Link to={'blogs'}>
          View All →
          </Link>
        </button>
      </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs?.slice(0,8).map((blog) => (
            <Link to={`/blog/${blog.slug}`}
            key={blog._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition duration-300"
              >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={`http://localhost:3000/uploads/blogs/${blog.coverImage}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  />

                {/* Category */}
                <span className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex items-center gap-2 mt-4">
                  {/* <img
                    src={blog.author.profileImage}
                    alt={blog.author.username}
                    className="w-8 h-8 rounded-full object-cover"
                    /> */}

                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">{blog.author.username}</p>
                    <p>{blog.createdAt}</p>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
    </section>
          </>
  )
}

export default FeaturedBlog
