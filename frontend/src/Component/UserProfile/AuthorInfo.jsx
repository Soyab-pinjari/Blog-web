import React, { useEffect, useState } from "react";
import { authorProfile, getauthorBlogs } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router";
import Navbar from "../Navbar";

const BASE_URL = import.meta.env.VITE_API_URL;

function AuthorInfo() {
  const { id } = useParams();

  const [author, setAuthor] = useState({});
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const BannerImage = author?.banner
    ? author.banner
    : `${BASE_URL}/default-banner.jpeg`;

  const profileImage = author?.profileImage
    ? author.profileImage
    : `${BASE_URL}/default-avatar.jpg`;

  const fetchUser = async () => {
    try {
      const res = await authorProfile(id);
      setAuthor(res.user);
      console.log("blog response", res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await getauthorBlogs(id);
      setBlogs(res);
      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBlogs();
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* ================= COVER ================= */}
          <div className="relative h-48 sm:h-60 md:h-72">
            <img
              src={BannerImage}
              alt="cover"
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Profile Image */}
            <div className="absolute -bottom-14 sm:-bottom-16 left-1/2 sm:left-8 -translate-x-1/2 sm:translate-x-0">
              <img
                src={profileImage}
                alt={author?.username || "profile"}
                loading="lazy"
                className="
                  w-28 h-28
                  sm:w-32 sm:h-32
                  md:w-36 md:h-36
                  rounded-full
                  border-4 border-white
                  object-cover
                  shadow-md
                  bg-white
                "
              />
            </div>
          </div>

          {/* ================= USER INFO ================= */}
          <div className="pt-20 sm:pt-20 px-5 sm:px-8 md:px-10 pb-8 text-center sm:text-left">

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {author?.username || "Author"}
            </h1>

            <p className="text-gray-600 mt-3 text-base sm:text-lg leading-7 max-w-2xl">
              {author?.bio || "No bio added yet"}
            </p>

            {/* Meta information */}
            <div className="
              flex
              flex-col sm:flex-row
              items-center sm:items-start
              justify-center sm:justify-start
              gap-3 sm:gap-8
              mt-5
              text-sm sm:text-base
              text-gray-500
            ">

              {/* Location */}
              <div className="flex items-center gap-2">
                <span>📍</span>

                <span>
                  {author?.location || "India"}
                </span>
              </div>

              {/* Joined */}
              {author?.createdAt && (
                <div>
                  <span className="font-medium text-gray-600">
                    Joined:
                  </span>{" "}
                  {new Date(author.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ================= BLOGS ================= */}
          <section className="px-5 sm:px-8 md:px-10 pb-10">

            {/* Heading */}
            <div className="flex items-center justify-between mb-7">
              <h2 className="
                text-2xl
                sm:text-3xl
                font-bold
                text-gray-900
              ">
                Blogs
              </h2>

              <span className="
                text-sm
                text-gray-500
                bg-gray-100
                px-3
                py-1
                rounded-full
              ">
                {blogs?.length || 0} posts
              </span>
            </div>

            {/* Blog List */}
            <div className="space-y-5">

              {blogs?.length > 0 ? (
                blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="block group"
                  >
                    <article className="
                      flex
                      flex-col sm:flex-row
                      gap-4 sm:gap-5
                      border
                      border-gray-200
                      rounded-2xl
                      p-4
                      hover:border-blue-200
                      hover:shadow-md
                      transition-all
                      duration-300
                      bg-white
                    ">

                      {/* Blog Image */}
                      <div className="
                        w-full
                        sm:w-44
                        md:w-48
                        h-48
                        sm:h-28
                        flex-shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-gray-100
                      ">
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

                      {/* Blog Details */}
                      <div className="flex-1 min-w-0">

                        <h3 className="
                          text-lg
                          sm:text-xl
                          font-semibold
                          text-gray-900
                          line-clamp-2
                          group-hover:text-blue-600
                          transition
                        ">
                          {blog.title}
                        </h3>

                        {/* Published */}
                        <p className="text-sm text-gray-500 mt-2">
                          Published{" "}
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>

                        {/* Category */}
                        {blog.category && (
                          <span className="
                            inline-block
                            mt-3
                            text-xs
                            font-medium
                            text-blue-600
                            bg-blue-50
                            px-3
                            py-1
                            rounded-full
                          ">
                            {blog.category}
                          </span>
                        )}
                      </div>

                    </article>
                  </Link>
                ))
              ) : (
                <div className="
                  text-center
                  py-12
                  border
                  border-dashed
                  border-gray-300
                  rounded-2xl
                ">
                  <p className="text-gray-500">
                    No blogs published yet.
                  </p>
                </div>
              )}

            </div>
          </section>

        </div>
      </main>
    </>
  );
}

export default AuthorInfo;