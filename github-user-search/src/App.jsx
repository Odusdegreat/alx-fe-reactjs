import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { fetchUserData } from "./services/githubService";
import Search from "./components/Search";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    setLoading(true);
    setError("");
    setUser(null);

    const userData = await fetchUserData(username);
    if (userData) {
      setUser(userData);
    } else {
      setError("Looks like we can't find the user.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold text-center">GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user && <UserCard user={user} />}
      <h1 className="text-center text-2xl font-bold">GitHub User Search</h1>
      <Search />
    </div>
  );
};

export default App;
