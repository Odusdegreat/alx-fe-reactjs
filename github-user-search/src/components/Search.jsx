import { useState } from "react";
import { fetchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    const results = await fetchUsers(username, location, minRepos);

    if (results.length === 0) {
      setError("Looks like we cant find the user");
    } else {
      setUsers(results);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="GitHub Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Location (optional)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Min Repositories (optional)..."
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 border p-4 rounded shadow-md"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View Profile
              </a>
              {user.location && (
                <p className="text-sm text-gray-500">📍 {user.location}</p>
              )}
              <p className="text-sm text-gray-500">
                📂 {user.public_repos} Repositories
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
