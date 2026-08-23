import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ImagePlus,
    X,
    Star,
    Save,
    Send,
} from "lucide-react";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [featured, setFeatured] = useState(false);
    const [coverImage, setCoverImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setCoverImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const removeImage = () => {
        setCoverImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            title,
            category,
            tags,
            featured,
            coverImage,
        });
    };

    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <Link
                        to="/admin/blogs"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Add New Blog
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Create and publish a new blog post
                        </p>
                    </div>

                </div>

            </div>


            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* Main Content */}
                    <div className="space-y-6 xl:col-span-2">

                        {/* Blog Information */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-gray-800">
                                Blog Information
                            </h2>

                            {/* Title */}
                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Blog Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter your blog title..."
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />

                            </div>


                            {/* Editor */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Blog Content
                                </label>

                                <div className="overflow-hidden rounded-lg border border-gray-200">

                                    {/* Toolbar */}
                                    <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-3">

                                        <button
                                            type="button"
                                            className="rounded px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-200"
                                        >
                                            B
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded px-3 py-1.5 text-sm italic text-gray-700 hover:bg-gray-200"
                                        >
                                            I
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded px-3 py-1.5 text-sm underline text-gray-700 hover:bg-gray-200"
                                        >
                                            U
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                            H1
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                            H2
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                            • List
                                        </button>

                                    </div>

                                    {/* Editor Area */}
                                    <textarea
                                        rows="14"
                                        placeholder="Start writing your blog..."
                                        className="w-full resize-none border-0 p-4 text-sm text-gray-700 outline-none focus:ring-0"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Cover Image */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-gray-800">
                                Cover Image
                            </h2>

                            {!coverImage ? (

                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-5 py-12 transition hover:border-blue-400 hover:bg-blue-50/30">

                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <ImagePlus size={26} />
                                    </div>

                                    <p className="text-sm font-medium text-gray-700">
                                        Click to upload cover image
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        PNG, JPG or WEBP — Max 5MB
                                    </p>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </label>

                            ) : (

                                <div className="relative overflow-hidden rounded-xl">

                                    <img
                                        src={coverImage.preview}
                                        alt="Cover Preview"
                                          loading="lazy"
                                        className="h-64 w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
                                    >
                                        <X size={18} />
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Publish */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-gray-800">
                                Publish
                            </h2>

                            <div className="space-y-3">

                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    <Send size={17} />
                                    Publish Blog
                                </button>

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <Save size={17} />
                                    Save as Draft
                                </button>

                            </div>

                        </div>


                        {/* Category */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-gray-800">
                                Category
                            </h2>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option value="React">
                                    React
                                </option>

                                <option value="JavaScript">
                                    JavaScript
                                </option>

                                <option value="Node.js">
                                    Node.js
                                </option>

                                <option value="MongoDB">
                                    MongoDB
                                </option>

                                <option value="Express">
                                    Express
                                </option>

                                <option value="CSS">
                                    CSS
                                </option>
                            </select>

                        </div>


                        {/* Tags */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 text-lg font-semibold text-gray-800">
                                Tags
                            </h2>

                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="react, javascript, web..."
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Separate tags with commas.
                            </p>

                        </div>


                        {/* Featured */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                                        <Star size={19} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Featured Blog
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Show on homepage
                                        </p>
                                    </div>

                                </div>

                                {/* Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setFeatured(!featured)}
                                    className={`relative h-6 w-11 rounded-full transition ${
                                        featured
                                            ? "bg-blue-600"
                                            : "bg-gray-300"
                                    }`}
                                >

                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                            featured
                                                ? "left-6"
                                                : "left-1"
                                        }`}
                                    />

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default AddBlog;