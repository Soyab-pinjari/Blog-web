import React from "react";
import {
    Eye,
    Pencil,
    Trash2,
    MoreHorizontal,
} from "lucide-react";

const RecentBlogs = () => {

    const blogs = [
        {
            id: 1,
            title: "Introduction to React Hooks",
            author: "Parvej Pinjari",
            category: "React",
            status: "Published",
            views: 1250,
            date: "Aug 22, 2026",
        },
        {
            id: 2,
            title: "Understanding Node.js",
            author: "Rahul Patel",
            category: "Node.js",
            status: "Published",
            views: 980,
            date: "Aug 21, 2026",
        },
        {
            id: 3,
            title: "MongoDB for Beginners",
            author: "Parvej Pinjari",
            category: "MongoDB",
            status: "Draft",
            views: 0,
            date: "Aug 20, 2026",
        },
        {
            id: 4,
            title: "JavaScript Array Methods",
            author: "Amit Shah",
            category: "JavaScript",
            status: "Published",
            views: 2100,
            date: "Aug 19, 2026",
        },
        {
            id: 5,
            title: "What is Express.js?",
            author: "Rahul Patel",
            category: "Express",
            status: "Published",
            views: 1540,
            date: "Aug 18, 2026",
        },
    ];

    return (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Recent Blogs
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Recently created blog posts
                    </p>
                </div>

                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View All
                </button>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

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
                                Action
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {blogs.map((blog) => (

                            <tr
                                key={blog.id}
                                className="border-b border-gray-100 transition hover:bg-gray-50"
                            >

                                {/* Blog */}
                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-600">
                                            {blog.title.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="max-w-[220px] truncate text-sm font-semibold text-gray-800">
                                                {blog.title}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Blog #{blog.id}
                                            </p>
                                        </div>

                                    </div>

                                </td>

                                {/* Author */}
                                <td className="px-5 py-4">
                                    <p className="text-sm text-gray-700">
                                        {blog.author}
                                    </p>
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
                                        className={`
                                            rounded-full px-3 py-1 text-xs font-medium
                                            ${
                                                blog.status === "Published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }
                                        `}
                                    >
                                        {blog.status}
                                    </span>

                                </td>

                                {/* Views */}
                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Eye size={14} />
                                        {blog.views.toLocaleString()}
                                    </div>

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
                                            className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <Eye size={16} />
                                        </button>

                                        <button
                                            title="Edit"
                                            className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-600"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            title="Delete"
                                            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <button
                                            title="More"
                                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default RecentBlogs;