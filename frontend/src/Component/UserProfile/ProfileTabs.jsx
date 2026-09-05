import React, { useEffect, useState } from "react";
import { deleteBlog, getUserBlogs } from "../../services/api";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";

const BASE_URL = import.meta.env.VITE_API_URL;

function ProfileTabs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const data = await getUserBlogs();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE BLOG
  // =========================
  const handleDelete = async (selectedSlug) => {
    try {
      setDeleting(true);

      const data = await deleteBlog(selectedSlug);
      console.log(data);

      setBlogs((prev) =>
        prev.filter((blog) => blog.slug !== selectedSlug)
      );

      setShowDeleteModal(false);
      setSelectedSlug(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
  <div className="w-full">

    {/* ================= HEADING ================= */}
    <h1
      className="
        inline-block
        text-xl
        font-bold
        text-blue-600
        border-b-4
        border-blue-600
        pb-2
        mt-5
        mb-6
      "
    >
      My Blogs
    </h1>

    {/* ================= LOADING ================= */}
    {loading ? (
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-5
              bg-white
              rounded-xl
              p-4
              border
              border-gray-200
              animate-pulse
            "
          >
            <div className="w-48 h-28 bg-gray-200 rounded-lg flex-shrink-0" />

            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-40" />
            </div>

            <div className="w-6 h-6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

    ) : blogs.length > 0 ? (

      /* ================= BLOG LIST ================= */
      <div className="space-y-5">

        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="
              flex
              items-center
              gap-5
              bg-white
              rounded-xl
              p-4
              border
              border-gray-300
              hover:border-blue-300
              hover:shadow-md
              transition-all
              duration-300
            "
          >

            {/* ================= BLOG ================= */}
            <Link
              to={`/blog/${blog.slug}`}
              className="
                group
                flex
                items-center
                gap-5
                flex-1
                min-w-0
              "
            >

              {/* IMAGE */}
              <div
                className="
                  w-48
                  h-28
                  flex-shrink-0
                  overflow-hidden
                  rounded-lg
                  bg-gray-100
                "
              >
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

              {/* DETAILS */}
              <div className="flex-1 min-w-0">

                <h2
                  className="
                    text-xl
                    font-semibold
                    text-slate-900
                    line-clamp-2
                    group-hover:text-blue-600
                    transition-colors
                  "
                >
                  {blog.title}
                </h2>

                <p className="text-gray-500 mt-3">
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

                {blog.category && (
                  <span
                    className="
                      inline-block
                      mt-2
                      text-xs
                      text-blue-600
                      bg-blue-50
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    {blog.category}
                  </span>
                )}

              </div>
            </Link>

            {/* ================= DELETE ================= */}
            <button
              type="button"
              disabled={deleting}
              onClick={() => {
                setSelectedSlug(blog.slug);
                setShowDeleteModal(true);
              }}
              className="
                flex-shrink-0
                p-2
                text-gray-400
                hover:text-red-500
                hover:bg-red-50
                rounded-lg
                transition
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <FiTrash2 size={21} />
            </button>

          </div>
        ))}

      </div>

    ) : (

      /* ================= EMPTY ================= */
      <div
        className="
          text-center
          py-12
          border
          border-dashed
          border-gray-300
          rounded-xl
          bg-gray-50
        "
      >
        <p className="text-gray-500">
          You haven't created any blogs yet.
        </p>

        <Link
          to="/create-blog"
          className="
            inline-block
            mt-4
            px-5
            py-2.5
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            hover:bg-blue-700
            transition
          "
        >
          Create Your First Blog
        </Link>
      </div>
    )}

    {/* ================= DELETE MODAL ================= */}
    {showDeleteModal && (
      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/50
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            bg-white
            rounded-2xl
            p-6
            shadow-2xl
          "
        >
          <h2 className="text-xl font-bold text-gray-900">
            Delete Blog?
          </h2>

          <p className="text-gray-500 mt-3 leading-6">
            Are you sure you want to delete this blog?
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-7">

            <button
              type="button"
              disabled={deleting}
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedSlug(null);
              }}
              className="
                px-5
                py-2.5
                rounded-lg
                border
                border-gray-300
                text-gray-700
                hover:bg-gray-100
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={deleting}
              onClick={() => handleDelete(selectedSlug)}
              className="
                px-5
                py-2.5
                rounded-lg
                bg-red-500
                text-white
                font-medium
                hover:bg-red-600
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>

          </div>
        </div>
      </div>
    )}

  </div>
);
}

export default ProfileTabs;