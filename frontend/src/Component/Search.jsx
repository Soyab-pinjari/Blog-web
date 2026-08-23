import React from 'react'
import { FiSearch, FiBell ,FiUser, FiMessageSquare} from "react-icons/fi";
function Search() {
   
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/search`,
        {
          params: { q: search },
        }
      );

      setResults(res.data.blogs);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="relative">
      {/* Search Box */}
      <div className="hidden lg:flex items-center border rounded-lg px-3 py-2 w-72">
        <FiSearch className="text-gray-500 text-lg" />

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="ml-2 w-full outline-none text-sm"
        />
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="absolute top-12 left-0 w-72 bg-white border rounded-lg shadow-lg z-50">
          {results.map((blog) => (
            <div
              key={blog._id}
              className="p-3 border-b hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="font-semibold text-sm">
                {blog.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {blog.category}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {search.trim() && results.length === 0 && (
        <div className="absolute top-12 left-0 w-72 bg-white border rounded-lg shadow-lg z-50 p-3">
          <p className="text-sm text-gray-500">
            No blogs found
          </p>
        </div>
      )}
    </div>
  );
}

export default Search
