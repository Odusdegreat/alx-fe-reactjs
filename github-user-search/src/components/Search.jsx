import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);
    setError(false);
    setUser(null);

    const data = await fetchUserData(query);

    if (data) {
      setUser(data);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-72"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Display results */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && (
        <p className="mt-4 text-red-500">Looks like we can't find the user</p>
      )}

      {user && (
        <div className="mt-6 p-4 border rounded-lg shadow-lg flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-xl font-semibold mt-2">{user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mt-2"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
