import React, { useState } from "react";
import { fetchUserData } from "../services/githubService"; // ✅ Import API call

const Search = () => {
  const [query, setQuery] = useState(""); // Username search
  const [location, setLocation] = useState(""); // Location search
  const [users, setUsers] = useState([]); // Users list
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const data = await fetchUserData(query, location); // ✅ Pass location
      if (data.items) {
        setUsers(data.items);
      } else {
        setError(true);
        setUsers([]);
      }
    } catch {
      setError(true);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Enter location (optional)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border rounded-md"
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
      {error && <p>Looks like we cant find the user</p>}

      {/* Display Multiple Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-md flex flex-col items-center"
          >
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-lg font-semibold mt-2">{user.login}</h2>
            {user.location && (
              <p className="text-gray-500">📍 {user.location}</p>
            )}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
