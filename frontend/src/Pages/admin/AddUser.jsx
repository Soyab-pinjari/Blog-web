import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    UserPlus,
    Save,
    Eye,
    EyeOff,
} from "lucide-react";

const AddUser = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
        status: "Active",
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

        console.log("User Data:", formData);

        // API call yahan baad mein add karenge
    };

    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">

                <Link
                    to="/admin/users"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                </Link>

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add New User
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create a new user account
                    </p>
                </div>

            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>

                <div className="mx-auto max-w-3xl">

                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                        {/* Header */}
                        <div className="border-b border-gray-200 px-6 py-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <UserPlus size={21} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-800">
                                        User Information
                                    </h2>

                                    <p className="text-xs text-gray-400">
                                        Enter the user's account details
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Form Body */}
                        <div className="space-y-5 p-6">

                            {/* Name */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                            </div>


                            {/* Email */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                            </div>


                            {/* Password */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        required
                                        minLength={6}
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>

                                </div>

                                <p className="mt-1 text-xs text-gray-400">
                                    Password must contain at least 6 characters.
                                </p>

                            </div>


                            {/* Role + Status */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                {/* Role */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Role
                                    </label>

                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="User">
                                            User
                                        </option>

                                        <option value="Editor">
                                            Editor
                                        </option>

                                        <option value="Admin">
                                            Admin
                                        </option>
                                    </select>

                                </div>


                                {/* Status */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
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


                        {/* Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">

                            <Link
                                to="/admin/users"
                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                <Save size={17} />
                                Create User
                            </button>

                        </div>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default AddUser;