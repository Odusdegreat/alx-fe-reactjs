import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="border p-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
