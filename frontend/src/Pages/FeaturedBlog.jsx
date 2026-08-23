import React, { useEffect, useState } from "react";
import { GetAllBlogs } from "../services/api";
import { Link } from "react-router-dom";
import BlogList from "../Component/Blog/BlogList";

function FeaturedBlog() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const data = await GetAllBlogs(category);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Blogs
          </h2>

          <Link
            to="/blogs"
            className="text-indigo-600 text-xl font-medium hover:text-indigo-800 transition"
          >
            View All →
          </Link>
        </div>

        <div className="relative w-52 md:w-64 mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-semibold shadow-sm cursor-pointer focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="Programming">Programming</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <BlogList blogs={blogs.slice(0, 8)} />
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No blogs found.
          </p>
        )}
      </section>
    </>
  );
}

export default FeaturedBlog;