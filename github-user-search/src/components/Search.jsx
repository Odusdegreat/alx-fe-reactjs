import React, { useState } from "react";
import { searchUsers } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents form from reloading the page
    setLoading(true);
    setError("");

    try {
      const result = await searchUsers(query, location, minRepos);
      setUsers(result);
    } catch (err) {
      setError("Looks like we can't find the user");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Location (optional)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <input
          type="number"
          placeholder="Min repositories (optional)..."
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="mt-4">Loading...</p>}

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display Search Results */}
      <div className="mt-6">
        {users.length > 0
          ? users.map((user) => (
              <div key={user.id} className="p-2 border-b border-gray-600">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-10 h-10 rounded-full inline mr-4"
                />
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {user.login}
                </a>
              </div>
            ))
          : !loading && <p className="mt-4">No users found.</p>}
      </div>
    </div>
  );
};

export default Search;
