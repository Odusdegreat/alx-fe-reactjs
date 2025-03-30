import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Fetch a single GitHub user by username.
 * @param {string} username - The GitHub username.
 * @returns {Promise<object|null>} - The GitHub user data.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null if user is not found
  }
};

/**
 * Search for GitHub users using advanced filters (location, minRepos).
 * @param {string} query - The search term (username or keyword).
 * @param {string} location - The user's location (optional).
 * @param {number} minRepos - Minimum number of repositories (optional).
 * @returns {Promise<Array>} - List of matching users.
 */
export const searchUsers = async (query, location = "", minRepos = 0) => {
  try {
    let searchQuery = `${query}`;

    if (location) {
      searchQuery += `+location:${location}`;
    }
    if (minRepos > 0) {
      searchQuery += `+repos:>${minRepos}`;
    }

    const response = await axios.get(
      `${BASE_URL}/search/users?q=${searchQuery}`
    );
    return response.data.items; // Return list of users
  } catch (error) {
    console.error("Error searching users:", error);
    return []; // Return empty array on error
  }
};
