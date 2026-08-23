import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    FolderOpen,
    FileText,
} from "lucide-react";
import axios from "axios";

const AdminCategories = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:3000/api/category"
            );

            setCategories(response.data.categories);

        } catch (error) {
            console.error(
                "Error fetching categories:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    // Delete category
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:3000/api/category/${id}`
            );

            // UI se remove
            setCategories((prev) =>
                prev.filter(
                    (category) => category._id !== id
                )
            );

        } catch (error) {
            console.error(
                "Delete category error:",
                error
            );
        }
    };


    // Search
    const filteredCategories = categories.filter(
        (category) =>
            category.name
                .toLowerCase()
                .includes(search.toLowerCase())
    );


    // Total blogs
    // Abhi Category model mein blog count nahi hai.
    // Isliye actual blog count baad mein Blog model ke relation se nikalenge.


    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Categories
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage blog categories
                    </p>
                </div>

                <Link
                    to="/admin/categories/add"
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add Category
                </Link>

            </div>


            {/* Stats */}
            <div className="mb-6">

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Total Categories
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-800">
                                {categories.length}
                            </h2>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <FolderOpen size={24} />
                        </div>

                    </div>

                </div>

            </div>


            {/* Category Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Search */}
                <div className="border-b border-gray-200 p-4">

                    <div className="relative w-full sm:max-w-md">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search categories..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                    </div>

                </div>


                {/* Result */}
                <div className="border-b border-gray-100 px-5 py-3">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            {filteredCategories.length}
                        </span>{" "}
                        categories
                    </p>

                </div>


                {/* Loading */}
                {loading ? (

                    <div className="px-5 py-16 text-center">

                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />

                        <p className="mt-3 text-sm text-gray-500">
                            Loading categories...
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[750px] text-left">

                            <thead>

                                <tr className="border-b border-gray-200 bg-gray-50">

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Category
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Slug
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Color
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Created
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredCategories.length > 0 ? (

                                    filteredCategories.map(
                                        (category) => (

                                            <tr
                                                key={category._id}
                                                className="border-b border-gray-100 transition hover:bg-gray-50"
                                            >

                                                {/* Category */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                                                            style={{
                                                                backgroundColor:
                                                                    category.color,
                                                            }}
                                                        >
                                                            <FolderOpen
                                                                size={19}
                                                            />
                                                        </div>

                                                        <div>

                                                            <p className="text-sm font-semibold text-gray-800">
                                                                {category.name}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                ID:{" "}
                                                                {category._id}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Slug */}
                                                <td className="px-5 py-4">

                                                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                                                        {category.slug}
                                                    </span>

                                                </td>


                                                {/* Color */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-2">

                                                        <span
                                                            className="h-6 w-6 rounded-full border border-gray-200"
                                                            style={{
                                                                backgroundColor:
                                                                    category.color,
                                                            }}
                                                        />

                                                        <span className="text-sm text-gray-500">
                                                            {category.color}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Created */}
                                                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                                    {new Date(
                                                        category.createdAt
                                                    ).toLocaleDateString()}
                                                </td>


                                                {/* Actions */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-1">

                                                        <Link
                                                            to={`/admin/categories/edit/${category._id}`}
                                                            title="Edit"
                                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-green-50 hover:text-green-600"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category._id
                                                                )
                                                            }
                                                            title="Delete"
                                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="px-5 py-12 text-center"
                                        >

                                            <p className="text-sm font-medium text-gray-600">
                                                No categories found
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Create a category or
                                                change your search.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                )}


                {/* Footer */}
                <div className="border-t border-gray-200 px-5 py-4">

                    <p className="text-xs text-gray-500">
                        Total {filteredCategories.length} categories
                    </p>

                </div>

            </div>

        </div>
    );
};

export default AdminCategories;