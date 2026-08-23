import React, { useState } from "react";
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminUsers = () => {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const users = [
        {
            id: 1,
            name: "Parvej Pinjari",
            email: "parvej@gmail.com",
            role: "Admin",
            status: "Active",
            blogs: 24,
            joined: "Aug 22, 2026",
        },
        {
            id: 2,
            name: "Rahul Patel",
            email: "rahul@gmail.com",
            role: "User",
            status: "Active",
            blogs: 12,
            joined: "Aug 21, 2026",
        },
        {
            id: 3,
            name: "Amit Shah",
            email: "amit@gmail.com",
            role: "User",
            status: "Active",
            blogs: 8,
            joined: "Aug 20, 2026",
        },
        {
            id: 4,
            name: "Mohit Sharma",
            email: "mohit@gmail.com",
            role: "User",
            status: "Blocked",
            blogs: 3,
            joined: "Aug 19, 2026",
        },
        {
            id: 5,
            name: "Neha Patel",
            email: "neha@gmail.com",
            role: "User",
            status: "Active",
            blogs: 15,
            joined: "Aug 18, 2026",
        },
        {
            id: 6,
            name: "Akash Kumar",
            email: "akash@gmail.com",
            role: "Editor",
            status: "Active",
            blogs: 19,
            joined: "Aug 17, 2026",
        },
    ];

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole =
            roleFilter === "All" ||
            user.role === roleFilter;

        const matchesStatus =
            statusFilter === "All" ||
            user.status === statusFilter;

        return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        );
    });

    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Users
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage registered users
                    </p>
                </div>

                <Link
    to="/admin/users/add"
    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
>
    <Plus size={18} />
    Add User
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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users..."
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                        </div>


                        {/* Filters */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                            <select
                                value={roleFilter}
                                onChange={(e) =>
                                    setRoleFilter(e.target.value)
                                }
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
                            >
                                <option value="All">
                                    All Roles
                                </option>

                                <option value="Admin">
                                    Admin
                                </option>

                                <option value="Editor">
                                    Editor
                                </option>

                                <option value="User">
                                    User
                                </option>
                            </select>


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

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Blocked">
                                    Blocked
                                </option>
                            </select>

                        </div>

                    </div>

                </div>


                {/* Results */}
                <div className="border-b border-gray-100 px-5 py-3">

                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            {filteredUsers.length}
                        </span>{" "}
                        users
                    </p>

                </div>


                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px] text-left">

                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    User
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Role
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Blogs
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Joined
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Actions
                                </th>

                            </tr>
                        </thead>


                        <tbody>

                            {filteredUsers.length > 0 ? (

                                filteredUsers.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-100 transition hover:bg-gray-50"
                                    >

                                        {/* User */}
                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                    {user.name.charAt(0)}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="truncate text-sm font-semibold text-gray-800">
                                                        {user.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {user.email}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Role */}
                                        <td className="px-5 py-4">

                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.role === "Admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user.role === "Editor"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {user.role === "Admin" ? (
                                                    <ShieldCheck size={13} />
                                                ) : (
                                                    <UserRound size={13} />
                                                )}

                                                {user.role}
                                            </span>

                                        </td>


                                        {/* Blogs */}
                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {user.blogs}
                                        </td>


                                        {/* Status */}
                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {user.status}
                                            </span>

                                        </td>


                                        {/* Joined */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                            {user.joined}
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
                                        colSpan="6"
                                        className="px-5 py-12 text-center"
                                    >
                                        <p className="text-sm font-medium text-gray-600">
                                            No users found
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
                        Total {filteredUsers.length} users
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

export default AdminUsers;