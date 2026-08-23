import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getblogDetails } from '../services/api';
import { Link, useNavigate, useParams } from 'react-router';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { categoryColors } from '../utils/categoryColors';
const BASE_URL = import.meta.env.VITE_API_URL
function BlogPage() {
     const { slug } = useParams();
const navigate=useNavigate();
    const [blog,setBlog]=useState(null);
   
    useEffect(()=>{
        const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }
            const fetchData = async()=>{
                try {
                    const res = await getblogDetails(slug);
                    setBlog(res);
                    console.log(res);
                } catch (error) {
                    console.log(error);
                }

            }
            if(slug) {
                fetchData();
            }
    },[slug])
  return (
    <div>
<Navbar/>
             <section className="max-w-4xl mx-auto px-6 py-10 mt-20">
      {/* Category */}
    <span
  className={`inline-block ${
    categoryColors[blog?.category] || "bg-gray-600"
  } text-white text-xs font-medium px-4 py-1 rounded-full mb-5`}
>
  {blog?.category || "Technology"}
</span>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
        {blog?.title || "The Future of AI: Trends to Watch in 2024"}
      </h1>


      {/* Author Info */}
      <div className="flex items-center gap-3 mb-8">
    <Link to={`/author/${blog?.author?._id}`}>
        <img
          src={
            blog?.author?.profileImage
            ? `${BASE_URL}/uploads/${blog.author.profileImage}`
            : `${BASE_URL}/default-avatar.jpg`
          }
          alt="author"
            loading="lazy"
          className="w-10 h-10 rounded-full object-cover"
          />

          </Link>
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-900">
            {blog?.author?.username || "John Doe"}
          </p>

          <div className="flex gap-2 text-gray-500">
            <span>Published At :
             {new Date(blog?.createdAt).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
            </span>
          </div>
        </div>
      </div>
      {/* Cover Image */}
 <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md mb-8">
  <img
    src={
      blog?.coverImage
        ? `${BASE_URL}/uploads/blogs/${blog.coverImage}`
        : "/default-blog.jpg"
    }
    alt={blog?.title || "Blog cover"}
    loading="lazy"
    className="w-full h-full object-cover object-center"
  />
</div>

      {/* Content */}
  <div
  className={`
    prose
    max-w-none
    prose-headings:font-bold
    prose-headings:text-gray-900
    prose-h1:text-4xl
    prose-h2:text-3xl
    prose-h3:text-2xl
    prose-p:text-lg
    prose-p:leading-8
    prose-strong:font-bold
    prose-a:text-blue-600
    prose-img:rounded-xl
  `}
  dangerouslySetInnerHTML={{ __html: blog?.content }}
/>
    </section>
    <Footer/>
    </div>
  )
}

export default BlogPage
