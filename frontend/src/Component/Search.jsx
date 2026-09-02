import React, { useEffect, useState } from "react";
import { searchBlogs,getblogDetails } from "../services/api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await searchBlogs(search);

        setSearchResults(data.blogs);
      } catch (error) {
        console.log("Search error:", error);
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
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs..."
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 pr-20 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        )}
      </div>

      {loading && search.trim() && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm text-gray-500">
          Searching...
        </div>
      )}

      {!loading && search.trim() && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {searchResults.map((blog) => (
            <button
              key={blog._id}
              onClick={() => handleBlogClick(blog.slug)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0"
            >
              <h3 className="font-semibold text-gray-800 truncate">
                {blog.title}
              </h3>

              {blog.category && (
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {blog.category}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {!loading &&
        search.trim() &&
        searchResults.length === 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm text-gray-500">
            No blogs found.
          </div>
        )}
    </div>
  );
};

export default Search;
