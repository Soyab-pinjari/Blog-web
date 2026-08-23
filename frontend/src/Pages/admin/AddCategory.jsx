import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    FolderPlus,
    Save,
} from "lucide-react";
import axios from "axios";

const AddCategory = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        color: "#6366F1",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Frontend validation
        if (!formData.name.trim()) {
            setError("Category name is required");
            return;
        }

        if (!formData.icon.trim()) {
            setError("Icon is required");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/api/category/create",
                {
                    name: formData.name.trim(),
                    icon: formData.icon.trim(),
                    color: formData.color,
                }
            );

            console.log("Category created:", response.data);

            setSuccess("Category created successfully!");

            // Clear form
            setFormData({
                name: "",
                icon: "",
                color: "#6366F1",
            });

            // 1 second baad category list
            setTimeout(() => {
                navigate("/admin/categories");
            }, 1000);

        } catch (error) {
            console.error("Create category error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to create category"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">

                <Link
                    to="/admin/categories"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                </Link>

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add Category
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create a new blog category
                    </p>
                </div>

            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>

                <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white shadow-sm">

                    {/* Card Header */}
                    <div className="border-b border-gray-200 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <FolderPlus size={21} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-800">
                                    Category Information
                                </h2>

                                <p className="text-xs text-gray-400">
                                    Enter category details
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Form Body */}
                    <div className="space-y-5 p-6">

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}


                        {/* Success */}
                        {success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                                {success}
                            </div>
                        )}


                        {/* Category Name */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. React"
                                maxLength={50}
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <p className="mt-1 text-xs text-gray-400">
                                Maximum 50 characters
                            </p>

                        </div>


                        {/* Icon */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Icon
                            </label>

                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                placeholder="e.g. Code2"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <p className="mt-1 text-xs text-gray-400">
                                Enter Lucide icon name, e.g. Code2, Database,
                                Server, Braces
                            </p>

                        </div>


                        {/* Color */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category Color
                            </label>

                            <div className="flex items-center gap-3">

                                <input
                                    type="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="h-11 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
                                />

                                <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            color: e.target.value,
                                        }))
                                    }
                                    className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                            </div>

                        </div>


                        {/* Preview */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Preview
                            </p>

                            <div className="flex items-center gap-3">

                                <div
                                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                                    style={{
                                        backgroundColor:
                                            formData.color,
                                    }}
                                >
                                    <FolderPlus size={20} />
                                </div>

                                <div>

                                    <p className="font-semibold text-gray-800">
                                        {formData.name || "Category Name"}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {formData.icon || "Icon"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">

                        <Link
                            to="/admin/categories"
                            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={17} />

                            {loading
                                ? "Creating..."
                                : "Create Category"}
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default AddCategory;