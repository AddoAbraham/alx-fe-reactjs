import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

// Basic search by username
export const searchUser = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};

// Alias for basic user fetch
export const fetchUserData = searchUser;

// Advanced search with username, location, and minimum repositories
export const advancedUserSearch = async (
  username = "",
  location = "",
  minRepos = ""
) => {
  const queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(" ");
  const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    return response.data.items; // array of user objects
  } catch (error) {
    throw new Error("Search failed");
  }
};
