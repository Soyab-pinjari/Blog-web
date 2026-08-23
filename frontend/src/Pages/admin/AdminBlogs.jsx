import React, { useState } from "react";

import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Star,
    Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminBlogs = () => {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const blogs = [
        {
            id: 1,
            title: "Introduction to React Hooks",
            author: "Parvej Pinjari",
            category: "React",
            status: "Published",
            views: 1250,
            date: "Aug 22, 2026",
            featured: true,
        },
        {
            id: 2,
            title: "Understanding Node.js",
            author: "Rahul Patel",
            category: "Node.js",
            status: "Published",
            views: 980,
            date: "Aug 21, 2026",
            featured: false,
        },
        {
            id: 3,
            title: "MongoDB for Beginners",
            author: "Parvej Pinjari",
            category: "MongoDB",
            status: "Draft",
            views: 0,
            date: "Aug 20, 2026",
            featured: false,
        },
        {
            id: 4,
            title: "JavaScript Array Methods",
            author: "Amit Shah",
            category: "JavaScript",
            status: "Published",
            views: 2100,
            date: "Aug 19, 2026",
            featured: true,
        },
        {
            id: 5,
            title: "What is Express.js?",
            author: "Rahul Patel",
            category: "Express",
            status: "Published",
            views: 1540,
            date: "Aug 18, 2026",
            featured: false,
        },
        {
            id: 6,
            title: "Getting Started with Tailwind CSS",
            author: "Amit Shah",
            category: "CSS",
            status: "Draft",
            views: 0,
            date: "Aug 17, 2026",
            featured: false,
        },
    ];

    const filteredBlogs = blogs.filter((blog) => {

        const matchesSearch =
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.author.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            blog.status === statusFilter;

        const matchesCategory =
            categoryFilter === "All" ||
            blog.category === categoryFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );
    });

    return (
        <div>

            {/* Page Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Blogs
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all your blog posts
                    </p>
                </div>

                {/* Add Blog */}
                <Link
    to="/admin/blogs/add"
    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
>
    <Plus size={18} />
    Add New Blog
</Link>


            </div>


            {/* Main Card */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Filters */}
                <div className="border-b border-gray-200 p-4">

                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search blogs or authors..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                        </div>


                        {/* Filters */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                            {/* Category */}
                            <div className="relative">

                                <Filter
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <select
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm text-gray-600 outline-none focus:border-blue-500"
                                >
                                    <option value="All">
                                        All Categories
                                    </option>

                                    <option value="React">
                                        React
                                    </option>

                                    <option value="Node.js">
                                        Node.js
                                    </option>

                                    <option value="MongoDB">
                                        MongoDB
                                    </option>

                                    <option value="JavaScript">
                                        JavaScript
                                    </option>

                                    <option value="Express">
                                        Express
                                    </option>

                                    <option value="CSS">
                                        CSS
                                    </option>
                                </select>

                            </div>


                            {/* Status */}
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
                            >
                                <option value="All">
                                    All Status
                                </option>

                                <option value="Published">
                                    Published
                                </option>

                                <option value="Draft">
                                    Draft
                                </option>
                            </select>

                        </div>

                    </div>

                </div>


                {/* Results Info */}
                <div className="border-b border-gray-100 px-5 py-3">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            {filteredBlogs.length}
                        </span>{" "}
                        blogs
                    </p>

                </div>


                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[950px] text-left">

                        <thead>

                            <tr className="border-b border-gray-200 bg-gray-50">

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Blog
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Author
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Category
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Views
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Date
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredBlogs.length > 0 ? (

                                filteredBlogs.map((blog) => (

                                    <tr
                                        key={blog.id}
                                        className="border-b border-gray-100 transition hover:bg-gray-50"
                                    >

                                        {/* Blog */}
                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-600">
                                                    {blog.title.charAt(0)}
                                                </div>

                                                <div className="min-w-0">

                                                    <div className="flex items-center gap-2">

                                                        <p className="max-w-[230px] truncate text-sm font-semibold text-gray-800">
                                                            {blog.title}
                                                        </p>

                                                        {blog.featured && (
                                                            <Star
                                                                size={14}
                                                                className="fill-yellow-400 text-yellow-400"
                                                            />
                                                        )}

                                                    </div>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Blog #{blog.id}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Author */}
                                        <td className="px-5 py-4 text-sm text-gray-700">
                                            {blog.author}
                                        </td>


                                        {/* Category */}
                                        <td className="px-5 py-4">

                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                {blog.category}
                                            </span>

                                        </td>


                                        {/* Status */}
                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    blog.status === "Published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {blog.status}
                                            </span>

                                        </td>


                                        {/* Views */}
                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {blog.views.toLocaleString()}
                                        </td>


                                        {/* Date */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                            {blog.date}
                                        </td>


                                        {/* Actions */}
                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-1">

                                                <button
                                                    title="View"
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    title="Edit"
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-green-50 hover:text-green-600"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    title="Delete"
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-5 py-12 text-center"
                                    >

                                        <p className="text-sm font-medium text-gray-600">
                                            No blogs found
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            Try changing your search or filters.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-gray-500">
                        Total {filteredBlogs.length} blogs
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            disabled
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-400"
                        >
                            Previous
                        </button>

                        <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white">
                            1
                        </button>

                        <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
                            2
                        </button>

                        <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminBlogs;