import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetAllBlogs } from '../services/api'
import { data, Link, useNavigate } from 'react-router-dom';
import { categoryColors } from '../utils/categoryColors';
import BlogList from '../Component/Blog/BlogList';

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
     <div className="relative w-52 md:w-64">
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="appearance-none w-50 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-semibold shadow-sm cursor-pointer focus:outline-none"
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
  </div>  
  <BlogList blogs={blogs.slice(0,8)}></BlogList>
  
      </section>
     </>
  )
}

export default FeaturedBlog
