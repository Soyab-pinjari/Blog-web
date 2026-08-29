import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    FolderPen,
    Save,
} from "lucide-react";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy data - API connect karne ke baad remove karenge
    const categories = [
        {
            id: 1,
            name: "React",
            description: "React.js tutorials and guides",
        },
        {
            id: 2,
            name: "JavaScript",
            description: "JavaScript programming tutorials",
        },
        {
            id: 3,
            name: "Node.js",
            description: "Node.js and backend development",
        },
        {
            id: 4,
            name: "MongoDB",
            description: "MongoDB database tutorials",
        },
        {
            id: 5,
            name: "CSS",
            description: "CSS and UI development",
        },
    ];

    const category = categories.find(
        (item) => item.id === Number(id)
    );

    const [formData, setFormData] = useState({
        name: category?.name || "",
        description: category?.description || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Updated Category:", {
            id,
            ...formData,
        });

        // API update baad mein connect karenge

        navigate("/admin/categories");
    };

    // Invalid category ID
    if (!category) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center">

                <h2 className="text-xl font-semibold text-gray-800">
                    Category Not Found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    The category you are trying to edit does not exist.
                </p>

                <Link
                    to="/admin/categories"
                    className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Back to Categories
                </Link>

            </div>
        );
    }

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
                        Edit Category
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update category information
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
                                <FolderPen size={21} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-800">
                                    Category Information
                                </h2>

                                <p className="text-xs text-gray-400">
                                    Editing Category #{id}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Form Body */}
                    <div className="space-y-5 p-6">

                        {/* Name */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                        </div>


                        {/* Description */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter category description"
                                rows="5"
                                required
                                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

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
                            
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            <Save size={17} />
                            Update Category
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default EditCategory;