import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

// Basic search by username (used in simple search)
export const searchUser = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};

// Alias: fetchUserData (in case some components use this name)
export const fetchUserData = searchUser;

// Advanced search with filters: username, location, and minimum repos
export const advancedUserSearch = async (
  username = "",
  location = "",
  minRepos = ""
) => {
  let queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(" ");
  const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    return response.data.items; // list of matched users
  } catch (error) {
    throw new Error("Search failed");
  }
};
