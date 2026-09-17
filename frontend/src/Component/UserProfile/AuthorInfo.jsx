import React, { useEffect, useState } from "react";

import {
  authorProfile,
  getauthorBlogs,
} from "../../services/api";

import { Link, useNavigate, useParams } from "react-router";

import Navbar from "../Navbar";

const BASE_URL = import.meta.env.VITE_API_URL;

function AuthorInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ================= STATE =================

  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= IMAGE =================

  const BannerImage = author?.banner
    ? author.banner
    : `${BASE_URL}/default-banner.jpeg`;

  const profileImage = author?.profileImage
    ? author.profileImage
    : `${BASE_URL}/default-avatar.jpg`;

  // ================= FETCH AUTHOR =================

  const fetchUser = async () => {
    try {
      console.log("Fetching author:", id);

      const res = await authorProfile(id);

      console.log("AUTHOR API RESPONSE:", res);

      if (res?.success && res?.user) {
        setAuthor(res.user);

        console.log("AUTHOR SET:", res.user);
      } else {
        console.log("Author data not found");
        setError("Author not found");
      }
    } catch (error) {
      console.log(
        "AUTHOR API ERROR:",
        error.response?.data || error
      );

      setError("Failed to load author profile");
    }
  };

  // ================= FETCH BLOGS =================

  const fetchBlogs = async () => {
    try {
      console.log("Fetching blogs for author:", id);

      const res = await getauthorBlogs(id);

      console.log("BLOG API RESPONSE:", res);

      setBlogs(res || []);

      console.log("BLOGS SET:", res);
    } catch (error) {
      console.log(
        "BLOG API ERROR:",
        error.response?.data || error
      );

      // Don't destroy author profile if blogs fail
      setBlogs([]);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("AUTHOR PAGE TOKEN:", token);
    console.log("AUTHOR ID:", id);

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        // Run both API calls together
        await Promise.all([
          fetchUser(),
          fetchBlogs(),
        ]);
      } catch (error) {
        console.log("PAGE LOAD ERROR:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // ================= SKELETON =================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 flex pt-30 justify-center items-center p-5">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden animate-pulse">

            {/* Banner Skeleton */}

            <div className="h-56 md:h-64 bg-gray-300"></div>

            {/* Profile Section */}

            <div className="relative px-8 pb-8">

              {/* Profile Image Skeleton */}

              <div className="absolute -top-16 left-8">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300"></div>
              </div>

              <div className="pt-20">

                {/* Username */}

                <div className="h-8 w-48 bg-gray-300 rounded"></div>

                {/* Bio */}

                <div className="mt-5 space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>

                {/* Details */}

                <div className="flex gap-8 mt-6">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Blogs Skeleton */}

            <div className="px-8 pb-10">

              <div className="h-7 w-24 bg-gray-300 rounded"></div>

              <div className="mt-6 space-y-5">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-5 border border-gray-200 rounded-xl p-4"
                  >
                    {/* Blog Image */}

                    <div className="w-48 h-28 flex-shrink-0 bg-gray-300 rounded-lg"></div>

                    {/* Blog Content */}

                    <div className="flex-1 space-y-4">

                      <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

                      <div className="h-4 w-40 bg-gray-200 rounded"></div>

                      <div className="h-4 w-24 bg-gray-200 rounded"></div>

                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-20">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">

            <h2 className="text-xl font-bold text-red-500">
              {error}
            </h2>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        </div>
      </>
    );
  }

  // ================= MAIN UI =================

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex pt-30 justify-center items-center p-5">

        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">

          {/* ================= BANNER ================= */}

          <div className="relative h-56 md:h-64">

            <img
              src={BannerImage}
              alt="cover"
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Profile Image */}

            <div className="absolute -bottom-16 left-8">

              <img
                src={profileImage}
                alt={author?.username || "profile"}
                loading="lazy"
                className="
                  w-32 h-32
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  shadow-md
                  bg-white
                "
              />

            </div>

          </div>

          {/* ================= AUTHOR INFO ================= */}

          <div className="px-8 pt-20 pb-8">

            <h1 className="text-3xl font-bold text-slate-900">
              {author?.username || "Author"}
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              {author?.bio || "No bio added yet"}
            </p>

            <div className="flex flex-wrap items-center gap-8 mt-6 text-slate-500">

              {/* Location */}

              <div className="flex items-center gap-2">
                <span>📍</span>

                <span>
                  {author?.location || "India"}
                </span>
              </div>

              {/* Joined Date */}

              {author?.createdAt && (
                <div>
                  Joined:{" "}
                  {new Date(
                    author.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              )}

            </div>

          </div>

          {/* ================= BLOGS ================= */}

          <div className="px-8 pb-10">

            <h2
              className="
                inline-block
                text-xl
                font-bold
                text-blue-600
                border-b-4
                border-blue-600
                pb-2
              "
            >
              Blogs
            </h2>

            <div className="mt-6 space-y-5">

              {blogs?.length > 0 ? (

                blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="block group"
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-5
                        border
                        border-gray-300
                        rounded-xl
                        p-4
                        bg-white
                        hover:shadow-md
                        hover:border-blue-300
                        transition
                      "
                    >

                      {/* Blog Image */}

                      <div className="w-48 h-28 flex-shrink-0 overflow-hidden rounded-lg">

                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          loading="lazy"
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-300
                          "
                        />

                      </div>

                      {/* Blog Content */}

                      <div className="flex-1 min-w-0">

                        <h3
                          className="
                            text-xl
                            font-semibold
                            text-slate-900
                            group-hover:text-blue-600
                            transition
                            line-clamp-2
                          "
                        >
                          {blog.title}
                        </h3>

                        <p className="text-slate-500 mt-3">
                          Published At:{" "}
                          {new Date(
                            blog.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        <p className="text-sm text-slate-400 mt-2">
                          {blog.category}
                        </p>

                      </div>

                    </div>

                  </Link>
                ))

              ) : (

                <p className="text-gray-500 py-8">
                  No blogs published yet.
                </p>

              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AuthorInfo;