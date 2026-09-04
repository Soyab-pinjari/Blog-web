import React, { useEffect, useState } from "react";
import { searchBlogs, getblogDetails } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

   console.log("🔎 Searching for:", search);
        const data = await searchBlogs(search);

        setSearchResults(data || []);

        console.log("✅ Search API response:", data);
      } catch (error) {
        console.log("Search error:", error);
        console.log("❌ Search error:", error);
        console.log("❌ Error response:", error.response);
        console.log("❌ Error message:", error.message);
        setSearchResults([]);
        
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleBlogClick = async (slug) => {
    try {
      const data = await getblogDetails(slug);

      console.log("Blog details:", data);

      setSearch("");
      setSearchResults([]);

      navigate(`/blog/${slug}`, {
        state: {
          blog: data.blog,
        },
      });
    } catch (error) {
      console.log("Get blog details error:", error);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  return (
    <div className="relative w-full sm:w-72 md:w-80 lg:w-96">

      {/* Search Input */}
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs..."
          className="
            w-full
            bg-gray-50
            border border-gray-300
            rounded-xl
            pl-10 pr-10 py-2.5
            text-sm sm:text-base
            text-gray-700
            outline-none
            transition
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-gray-700
              transition
            "
          >
            <FiX className="text-lg" />
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && search.trim() && (
        <div
          className="
            absolute
            top-full left-0
            mt-2
            w-full
            z-[9999]
            bg-white
            border border-gray-200
            rounded-xl
            shadow-xl
            px-4 py-3
            text-sm
            text-gray-500
          "
        >
          Searching...
        </div>
      )}

      {/* Results */}
      {!loading && search.trim() && searchResults.length > 0 && (
        <div
          className="
            absolute
            top-full left-0
            mt-2
            w-full
            max-h-80
            overflow-y-auto
            z-[9999]
            bg-white
            border border-gray-200
            rounded-xl
            shadow-xl
          "
        >
          {searchResults.map((blog) => (
            <button
              key={blog._id}
              type="button"
              onClick={() => handleBlogClick(blog.slug)}
              className="
                w-full
                text-left
                px-4 py-3
                hover:bg-gray-50
                transition
                border-b
                last:border-b-0
              "
            >
              <h3 className="font-semibold text-gray-800 truncate">
                {blog.title}
              </h3>

              {blog.category && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 capitalize">
                  {blog.category}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading &&
        search.trim() &&
        searchResults.length === 0 && (
          <div
            className="
              absolute
              top-full left-0
              mt-2
              w-full
              z-[9999]
              bg-white
              border border-gray-200
              rounded-xl
              shadow-xl
              px-4 py-3
              text-sm
              text-gray-500
            "
          >
            No blogs found.
          </div>
        )}
    </div>
  );
};

export default Search;