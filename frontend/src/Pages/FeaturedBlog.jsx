import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetAllBlogs } from '../services/api'
import { data, Link, useNavigate } from 'react-router';
import { categoryColors } from '../utils/categoryColors';

function FeaturedBlog() {
    const [blogs,setBlogs]=useState([]);
    const [category,setCategory]=useState("");
const navigate = useNavigate();
 const fetchBlogs = async () => {
    try {
      const data = await GetAllBlogs(category);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };
   useEffect(() => {
    
    fetchBlogs();
  }, [category]);


  return (
    <>

   <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Blogs
        </h2>

        <button className="text-indigo-600 text-xl font-medium  hover:text-indigo-800 transition">
          <Link to={'blogs'}>
          View All →
          </Link>
        </button>
      </div>
<div className="relative w-full md:w-64">
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="
      appearance-none
      w-full
      bg-gray-50
      border
      border-gray-300
      rounded-xl
      px-4
      py-3
      pr-5
      text-gray-700
      font-semibold
      shadow-sm
      cursor-pointer
      focus:outline-none
    "
  >
    <option value="">All Categories</option>
    <option value="Technology">Technology</option>
    <option value="Travel">Travel</option>
    <option value="Education">Education</option>
    <option value="Health">Health</option>
    <option value="Bussiness">Bussiness</option>
    <option value="Programming">Programming</option>
    <option value="Lifestyle">Lifestyle</option>
    <option value="Entertainment">Entertainment</option>
  </select>

  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
    ▼
  </span>
</div>
        {/* Cards */}
        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs?.slice(0,8).map((blog) => (
            <Link to={`/blog/${blog.slug}`}
            key={blog._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 flex flex-col h-full"
              >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={`http://localhost:3000/uploads/blogs/${blog.coverImage}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  />
                {/* Category */}
                <span
                className={`absolute bottom-3 left-3 text-white text-xs px-3 py-1 rounded-full ${
                  categoryColors[blog.category] || "bg-gray-600"
                }`}
              >
                {blog.category}
            </span>
              </div>

             <div className="p-4 flex flex-col flex-1">
  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[56px]">
    {blog.title}
  </h3>

  <div className="mt-auto flex items-center gap-3 pt-4">
    <img
      src={`http://localhost:3000/uploads/${blog.author.profileImage}`}
      alt="profile"
      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
    />

    <div className="text-sm text-gray-600">
      <p className="font-medium text-black">
        {blog.author.username}
      </p>

      <p>
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
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
