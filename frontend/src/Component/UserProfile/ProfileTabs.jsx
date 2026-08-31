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

  // =========================
  // FETCH USER BLOGS
  // =========================

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

      console.log("Deleting:", selectedSlug);

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
    <div>

      {/* Heading */}
      <h1 className="text-1xl font-bold mt-5 mb-5 text-blue-500 border-b-4 border-blue-500 pb-2 inline-block">
        My Blogs
      </h1>

      {/* =========================
          LOADING SKELETON
      ========================= */}

      {loading ? (

        <div className="space-y-4">

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border animate-pulse"
            >

              {/* Left side */}
              <div className="flex gap-7 flex-1">

                {/* Image */}
                <div className="w-40 h-24 bg-gray-200 rounded-lg"></div>

                {/* Text */}
                <div className="flex-1">

                  {/* Title */}
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

                  {/* Date */}
                  <div className="h-4 bg-gray-200 rounded w-40"></div>

                </div>

              </div>

              {/* Delete icon */}
              <div className="w-6 h-6 bg-gray-200 rounded"></div>

            </div>
          ))}

        </div>

      ) : blogs.length > 0 ? (

        /* =========================
           BLOG LIST
        ========================= */

        <div className="space-y-4">

          {blogs.map((blog) => (

            <div
              key={blog.slug}
              className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border"
            >

              {/* Blog */}
              <Link
                to={`/blog/${blog.slug}`}
                className="flex gap-7 flex-1"
              >

                <div className="flex gap-7">

                  {/* Blog Image */}
                  <img
                    src={`${BASE_URL}/uploads/blogs/${blog.coverImage}`}
                    alt={blog.title}
                    className="w-40 h-24 rounded-lg object-cover"
                  />

                  {/* Blog Details */}
                  <div>

                    <h2 className="text-xl font-semibold">
                      {blog.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Published At :{" "}
                      {new Date(blog.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                  </div>

                </div>

              </Link>

              {/* Delete Button */}
              <button
                type="button"
                disabled={deleting}
                className={`text-gray-500 hover:text-red-500 ${
                  deleting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  setSelectedSlug(blog.slug);
                  setShowDeleteModal(true);
                }}
              >
                <FiTrash2 size={22} />
              </button>

              {/* =========================
                  DELETE MODAL
              ========================= */}

              {showDeleteModal &&
                selectedSlug === blog.slug && (

                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">

                      <h2 className="text-xl font-semibold">
                        Delete Blog?
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Are you sure you want to delete this blog?
                        This action cannot be undone.
                      </p>

                      <div className="flex justify-end gap-3 mt-6">

                        {/* Cancel */}
                        <button
                          type="button"
                          disabled={deleting}
                          onClick={() => {
                            setShowDeleteModal(false);
                            setSelectedSlug(null);
                          }}
                          className="px-4 py-2 rounded-lg border disabled:opacity-50"
                        >
                          Cancel
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          disabled={deleting}
                          onClick={() =>
                            handleDelete(selectedSlug)
                          }
                          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleting ? "Deleting..." : "Delete"}
                        </button>

                      </div>

                    </div>

                  </div>
                )}

            </div>

          ))}

        </div>

      ) : (

      

        <p className="text-center text-gray-500 mt-10">
          You haven't created any blogs yet.
        </p>

      )}

    </div>
  );
}

export default ProfileTabs;