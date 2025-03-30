import React, { useState } from "react";
import { fetchUserData } from "../services/githubService"; // ✅ Import function

const Search = () => {
  const [query, setQuery] = useState(""); // User input state
  const [user, setUser] = useState(null); // User data state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    setError(false);

    try {
      const data = await fetchUserData(query);
      if (data) {
        setUser(data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Display Loading State */}
      {loading && <p>Loading...</p>}

      {/* Display Error Message */}
      {error && <p>❌ Looks like we can't find the user.</p>}

      {/* Display User Info if Found */}
      {user && (
        <div className="text-center mt-4">
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold mt-2">{user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
