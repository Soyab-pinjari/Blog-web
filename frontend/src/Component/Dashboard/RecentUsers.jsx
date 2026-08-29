import React from "react";
import {
    Mail,
    CalendarDays,
    MoreHorizontal,
} from "lucide-react";

const RecentUsers = () => {

    const users = [
        {
            id: 1,
            name: "Parvej Pinjari",
            email: "parvej@gmail.com",
            role: "Admin",
            joined: "Aug 22, 2026",
        },
        {
            id: 2,
            name: "Rahul Patel",
            email: "rahul@gmail.com",
            role: "User",
            joined: "Aug 21, 2026",
        },
        {
            id: 3,
            name: "Amit Shah",
            email: "amit@gmail.com",
            role: "User",
            joined: "Aug 20, 2026",
        },
        {
            id: 4,
            name: "Mohit Sharma",
            email: "mohit@gmail.com",
            role: "User",
            joined: "Aug 19, 2026",
        },
    ];

    return (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Recent Users
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Recently registered users
                    </p>
                </div>

                <button  className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View All

                </button>

            </div>

            {/* Users */}
            <div className="divide-y divide-gray-100">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="flex items-center justify-between px-5 py-4 transition hover:bg-gray-50"
                    >

                        {/* User Info */}
                        <div className="flex min-w-0 items-center gap-3">

                            {/* Avatar */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                {user.name.charAt(0)}
                            </div>

                            <div className="min-w-0">

                                <div className="flex items-center gap-2">

                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        {user.name}
                                    </p>

                                    {user.role === "Admin" && (
                                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                                            Admin
                                        </span>
                                    )}

                                </div>

                                {/* Email */}
                                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                    <Mail size={12} />
                                    <span className="truncate">
                                        {user.email}
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* Date & Action */}
                        <div className="ml-4 flex items-center gap-4">

                            <div className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
                                <CalendarDays size={13} />
                                {user.joined}
                            </div>

                            <button
                                title="More options"
                               
                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <MoreHorizontal size={18} />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default RecentUsers;