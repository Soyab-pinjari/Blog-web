import React from "react";
import StatCard from "./StatCard";
import RecentBlogs from "./RecentBlogs";
import {
    FileText,
    Users,
    Eye,
    MessageSquare
} from "lucide-react";
import RecentUsers from "./RecentUsers";
import BlogAnalytics from "./BlogAnalytics";

const AdminDashboard = () => {
    return (
        <div>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Welcome back, Admin. Here's what's happening with your blog.
                </p>
            </div>


            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Blogs"
                    value="1,245"
                    icon={FileText}
                    growth="+12% this month"
                />

                <StatCard
                    title="Total Users"
                    value="328"
                    icon={Users}
                    growth="+8% this month"
                />

                <StatCard
                    title="Total Views"
                    value="8,542"
                    icon={Eye}
                    growth="+18% this month"
                />

                <StatCard
                    title="Total Comments"
                    value="1,126"
                    icon={MessageSquare}
                    growth="+6% this month"
                />

            </div>


            {/* Recent Blogs + Recent Users */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

                <RecentBlogs />

                <RecentUsers />

            </div>


            {/* Blog Analytics */}
            <div className="mt-6">

                <BlogAnalytics />

            </div>

        </div>
    );
};
export default AdminDashboard;