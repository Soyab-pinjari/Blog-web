import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { GetAllBlogs } from "../services/api";
import { Link, useNavigate } from "react-router";
import { categoryColors } from "../utils/categoryColors";
import BlogList from "../Component/Blog/BlogList";
function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
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
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
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
    
  </span>
</div>
        <BlogList
        blogs={blogs}
           title="All Blogs"
        >

        </BlogList>
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