import React, { useEffect, useState } from "react";

import Navbar from "../Component/Navbar";
import { GetAllBlogs } from "../services/api";
import { useNavigate } from "react-router";
import BlogList from "../Component/Blog/BlogList";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

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
  }, [category, navigate]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="pt-24 pb-12">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            Explore Blogs
          </h2>

          {/* Category */}
          <div className="relative w-52 md:w-64 mb-8">
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="appearance-none w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-semibold shadow-sm cursor-pointer focus:outline-none"
>
  <option value="">All Categories</option>

  <option value="technology">Technology</option>
  <option value="travel">Travel</option>
  <option value="education">Education</option>
  <option value="health">Health</option>
  <option value="business">Business</option>
  <option value="programming">Programming</option>
  <option value="lifestyle">Lifestyle</option>
  <option value="sports">Sports</option>
  <option value="entertainment">Entertainment</option>
</select>
          </div>

          {/* =========================
              LOADING SKELETON
          ========================= */}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse"
                >
                  {/* Image */}
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>

                  {/* Category */}
                  <div className="w-20 h-5 bg-gray-200 rounded-full mb-3"></div>

                  {/* Title */}
                  <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>

                  <div className="h-5 bg-gray-200 rounded w-4/5 mb-4"></div>

                  {/* Description */}
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>

                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (

            <BlogList
              blogs={blogs}
              title="All Blogs"
            />

          ) : (

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