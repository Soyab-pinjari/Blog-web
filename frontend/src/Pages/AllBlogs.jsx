import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { GetAllBlogs } from "../services/api";
import { Link } from "react-router";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [category,setCategory]=useState("");
 

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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="pt-24 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            Explore Blogs
          </h2>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-6">
            {blogs.map((blog) => (
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
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">
                        {blog.author?.username || "Unknown"}
                      </p>
                      <p className="mt-1">
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

          {blogs.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default AllBlogs;