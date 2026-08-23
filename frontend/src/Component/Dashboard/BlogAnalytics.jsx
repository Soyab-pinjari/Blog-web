import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BlogAnalytics = () => {

    const data = [
        {
            month: "Jan",
            views: 1200,
        },
        {
            month: "Feb",
            views: 1800,
        },
        {
            month: "Mar",
            views: 2400,
        },
        {
            month: "Apr",
            views: 2100,
        },
        {
            month: "May",
            views: 3200,
        },
        {
            month: "Jun",
            views: 4100,
        },
        {
            month: "Jul",
            views: 5200,
        },
        {
            month: "Aug",
            views: 6800,
        },
    ];

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Blog Analytics
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Monthly blog views
                    </p>
                </div>

                {/* Filter */}
                <select
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-blue-500"
                    defaultValue="8"
                >
                    <option value="8">
                        Last 8 Months
                    </option>

                    <option value="6">
                        Last 6 Months
                    </option>

                    <option value="12">
                        Last 12 Months
                    </option>
                </select>

            </div>

            {/* Chart */}
            <div className="h-[320px] w-full p-4">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="views"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default BlogAnalytics;