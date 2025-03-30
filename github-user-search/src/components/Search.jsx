import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={fetchUserData}
        className="bg-blue-500 text-white px-4 py-2 mt-2 w-full"
      >
        Search
      </button>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {userData && (
        <div className="mt-4 p-4 border rounded">
          <img
            src={userData.avatar_url}
            alt="User avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h2 className="text-center mt-2">{userData.login}</h2>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 block text-center mt-2"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
