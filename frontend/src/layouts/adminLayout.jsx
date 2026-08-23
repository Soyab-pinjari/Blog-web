import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AdminDashboard from "../Component/Dashboard/adminDashboard";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: "📊",
        },
        {
            name: "Blogs",
            path: "/admin/blogs",
            icon: "📝",
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "👥",
        },
        {
            name: "Comments",
            path: "/admin/comments",
            icon: "💬",
        },
        {
            name: "Categories",
            path: "/admin/categories",
            icon: "🏷️",
        },
        {
            name: "Analytics",
            path: "/admin/analytics",
            icon: "📈",
        },
    ];

    const isActive = (path) => {
        if (path === "/admin") {
            return location.pathname === "/admin";
        }

        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-40 h-screen w-64
                    bg-gray-900 text-white
                    transform transition-transform duration-300
                    lg:translate-x-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-gray-700 px-5">
                    <Link
                        to="/admin/blogs"
                        className="text-2xl font-bold text-white"
                    >
                        Blog<span className="text-blue-500">Admin</span>
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-xl text-gray-400 hover:text-white lg:hidden"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-5 px-3">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Main Menu
                    </p>

                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`
                                mb-1 flex items-center gap-3 rounded-lg
                                px-4 py-3 text-sm font-medium
                                transition
                                ${
                                    isActive(item.path)
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }
                            `}
                        >
                            <span className="text-lg">
                                {item.icon}
                            </span>

                            <span>{item.name}</span>
                        </Link>
                    ))}

                    <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Account
                    </p>

                    <Link
                        to="/admin/profile"
                        className={`
                            mb-1 flex items-center gap-3 rounded-lg
                            px-4 py-3 text-sm font-medium transition
                            ${
                                isActive("/admin/profile")
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }
                        `}
                    >
                        <span className="text-lg">👤</span>
                        <span>Profile</span>
                    </Link>

                    <Link
                        to="/admin/settings"
                        className={`
                            mb-1 flex items-center gap-3 rounded-lg
                            px-4 py-3 text-sm font-medium transition
                            ${
                                isActive("/admin/settings")
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }
                        `}
                    >
                        <span className="text-lg">⚙️</span>
                        <span>Settings</span>
                    </Link>

                    <button
                        className="
                            mt-2 flex w-full items-center gap-3
                            rounded-lg px-4 py-3
                            text-sm font-medium text-red-400
                            transition hover:bg-red-500/10
                        "
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("loggedUser");
                            window.location.href = "/signin";
                        }}
                    >
                        <span className="text-lg">🚪</span>
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Area */}
            <div className="lg:ml-64">

                {/* Navbar */}
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">

                    <div className="flex items-center gap-4">

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-2xl text-gray-700 lg:hidden"
                        >
                            ☰
                        </button>

                        <div>
                            <h1 className="text-lg font-semibold text-gray-800">
                                Admin Panel
                            </h1>

                            <p className="hidden text-xs text-gray-500 sm:block">
                                Manage your blog website
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* Notification */}
                        <button className="relative rounded-full p-2 text-xl hover:bg-gray-100">
                            🔔

                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        {/* Admin Profile */}
                        <div className="flex items-center gap-3">

                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-semibold text-gray-800">
                                    Admin
                                </p>

                                <p className="text-xs text-gray-500">
                                    Administrator
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                A
                            </div>

                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6">
                  <Outlet/>
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;