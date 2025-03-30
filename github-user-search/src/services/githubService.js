import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Fetches user data from GitHub API based on the given username.
 * @param {string} username - The GitHub username to search.
 * @returns {Promise<object>} - The GitHub user data.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null in case of an error
  }
};
