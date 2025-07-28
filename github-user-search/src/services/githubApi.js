import axios from "axios";

const BASE_URL = "https://api.github.com";

// Optional: If you have a GitHub API token in your `.env`
const headers = import.meta.env.VITE_APP_GITHUB_API_KEY
  ? {
      Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    }
  : {};

export const searchUser = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
};
