import React, { useEffect, useState } from "react";
import { getblogDetails } from "../services/api";
import { Link, useNavigate, useParams } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { categoryColors } from "../utils/categoryColors";
import LikeButton from "../Component/LikeButton";

const BASE_URL = import.meta.env.VITE_API_URL;

function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getblogDetails(slug);

        setBlog(res);

        // New blog image ke liye loader dobara show karo
        setImageLoading(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, navigate]);

  // =========================
  // PAGE LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="max-w-4xl mx-auto px-6 py-10 mt-20 w-full animate-pulse">
          {/* Category skeleton */}
          <div className="w-24 h-6 bg-gray-200 rounded-full mb-5"></div>

          {/* Title skeleton */}
          <div className="h-12 bg-gray-200 rounded-md w-4/5 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded-md w-3/5 mb-8"></div>

          {/* Author skeleton */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Cover image skeleton */}
          <div className="w-full aspect-video bg-gray-200 rounded-xl mb-8"></div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded w-10/12"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-9/12"></div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-10 mt-20">

        {/* Category */}
        <span
          className={`inline-block ${
            categoryColors[blog.category?.toLowerCase()]  || "bg-gray-600"
          } text-white text-xs font-medium px-4 py-1 rounded-full mb-5`}
        >
          {blog?.category.charAt(0).toUpperCase() + blog.category.slice(1) || "Technology"}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
          {blog?.title || "The Future of AI"}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-8">

          <Link to={`/author/${blog?.author?._id}`}>
            <img
              src={
                blog?.author?.profileImage
                  ? blog.author.profileImage
                  : `${BASE_URL}/default-avatar.jpg`
              }
              alt="author"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>

          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {blog?.author?.username || "John Doe"}
            </p>

            <div className="flex gap-2 text-gray-500">
              <span>
                Published At :{" "}
                {new Date(blog?.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          <LikeButton/>
          </div>
        </div>

        {/* =========================
            COVER IMAGE
        ========================= */}

        <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-md mb-8 bg-gray-200">

          {/* Image Loader */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
              <div className="flex flex-col items-center gap-3">

                {/* Spinner */}
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>

                <p className="text-sm text-gray-600">
                  Loading image...
                </p>

              </div>
            </div>
          )}

          {/* Cover Image */}
          <img
            src={
              blog?.coverImage
                ? blog.coverImage
                : "/default-blog.jpg"
            }
            alt={blog?.title || "Blog cover"}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
          />

        </div>

        {/* Content */}
        <div
          className="
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
          "
          dangerouslySetInnerHTML={{
            __html: blog?.content,
          }}
        />

      </section>

      <Footer />
    </div>
  );
}

export default BlogPage;