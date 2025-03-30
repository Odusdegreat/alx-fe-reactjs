import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com/search/users";

export const fetchUsers = async (username, location, minRepos) => {
  try {
    let query = `q=${username}`;

    if (location) {
      query += `+location:${location}`;
    }
    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }

    const response = await axios.get(
      `${GITHUB_API_BASE_URL}?${query}&per_page=10`
    );
    return response.data.items; // Extract user list
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
