import React from "react";

const StatCard = ({ title, value, icon: Icon, growth }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

                {/* Card Information */}
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-800">
                        {value}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-green-600">
                        {growth}
                    </p>
                </div>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={25} strokeWidth={2} />
                </div>

            </div>
        </div>
    );
};

export default StatCard;