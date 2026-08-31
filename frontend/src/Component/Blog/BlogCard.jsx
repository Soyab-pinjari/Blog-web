import { Link, useNavigate } from "react-router-dom";
import { categoryColors } from "../../utils/categoryColors";

import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL
function BlogCard({ blog }) {


  const navigate = useNavigate();
  

  return (

    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 flex flex-col h-full">
   
      <Link to={`/blog/${blog.slug}`}>
        <div className="relative h-48">
          <img
            src={blog.coverImage}
            alt={blog.title}
              loading="lazy"
            className="w-full h-full object-cover"
          />

          <span
            className={`absolute bottom-3 left-3 text-white text-xs px-3 py-1 rounded-full ${
              categoryColors[blog.category] || "bg-gray-600"
            }`}
          >
            {blog.category}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 h-[56px]">
            {blog.title}
          </h3>
        </div>
      </Link>


      <Link
        to={`/author/${blog.author._id}`}
        className="flex items-center gap-3 px-4 pb-4"
      >
       <img
  src={blog.author?.profileImage || `${BASE_URL}/default-avatar.jpg`}
  alt={blog.author?.username || "Author"}
          className="w-10 h-10 rounded-full object-cover"
            loading="lazy"
        />

        <div>
          <p className="font-medium">
            {blog.author.username}
          </p>

          <p className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString('en-IN',{
                day:"2-digit",
                month:"short",
                year:"numeric"
            })}
          </p>
        </div>

      </Link>

    </div>
  );
}

export default BlogCard;