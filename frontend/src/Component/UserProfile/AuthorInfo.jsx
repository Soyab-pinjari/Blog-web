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
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    fetchUser();
    fetchBlogs();
  }, [id]);

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
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
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
        </div>

        <div className="px-8 pt-20 pb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            {author?.username || "Author"}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            {author?.bio || "No bio added yet"}
          </p>

    
          <div className="flex flex-wrap items-center gap-8 mt-6 text-slate-500">

            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>
                {author?.location || "India"}
              </span>
            </div>

            {author?.createdAt && (
              <div>
                Joined:{" "}
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

        {/* ================= MY BLOGS ================= */}
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

          {/* Blog List */}
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
                        Published At :{" "}
                        {new Date(blog.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
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