import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlogCreate } from "../../services/api";
import BlogEditor from "../BlogEditor";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/category"
      );

      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Category fetch error:", error);
      setErrorMsg("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter blog title");
      return;
    }

    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }

    if (!file) {
      setErrorMsg("Please add a cover image");
      return;
    }

    if (!content.trim()) {
      setErrorMsg("Please enter blog content");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("coverImage", file);

    try {
      const response = await BlogCreate(formData);

      console.log("Blog created:", response);

      setSuccessMsg("Blog published successfully!");

      // Redirect after successful creation
      navigate("/");
    } catch (error) {
      console.error("Blog create error:", error);

      setErrorMsg(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );

      setSuccessMsg("");
    }
  };

  return (
    <>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="pt-20"
        encType="multipart/form-data"
      >
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-8">

            {/* Back */}
            <Link
              to="/profile"
              className="text-indigo-600 mb-4 inline-block cursor-pointer"
            >
              ← Back
            </Link>

            <h1 className="text-2xl font-semibold mb-8">
              Create New Blog
            </h1>

            {/* Error message */}
            {errorMsg && (
              <p className="text-center text-red-500 mb-4">
                {errorMsg}
              </p>
            )}

            {/* Success message */}
            {successMsg && (
              <p className="text-center text-green-600 mb-4">
                {successMsg}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Blog Title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((item) => (
                    <option
                      key={item._id}
                      value={item.slug}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cover Image */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>

              <label
                htmlFor="cover-upload"
                className="w-full md:w-1/2 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
              >
                {file ? (
                  <div className="text-center">
                    <p className="text-green-600 font-medium">
                      {file.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 text-lg">
                      📷 Upload Cover Image
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Click here to choose an image
                    </p>
                  </div>
                )}
              </label>

              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />
            </div>

            {/* Content */}
            <div className="mt-6">
              <label className="block mb-2 font-semibold">
                Content
              </label>

              <BlogEditor
                content={content}
                setContent={setContent}
              />
            </div>

            {/* Publish button */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-7 py-3 rounded-lg hover:bg-indigo-700"
              >
                Publish
              </button>
            </div>

          </div>
        </div>
      </form>
    </>
  );
}

export default CreateBlog;