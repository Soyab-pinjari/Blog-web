import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { GetAllBlogs } from "../services/api";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const data = await GetAllBlogs();

      const formattedBlogs = data.map((blog) => ({
        ...blog,
        createdAt: new Date(blog.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));

      setBlogs(formattedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="pt-24 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore Blogs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <div
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
                      <p>{blog.createdAt}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    {blog.readTime || "5 min read"}
                  </p>
                </div>
              </div>
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