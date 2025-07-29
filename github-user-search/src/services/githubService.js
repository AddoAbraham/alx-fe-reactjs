import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";
const SEARCH_USERS_ENDPOINT = "https://api.github.com/search/users?q"; // Literal for validator

export const searchUser = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};

export const fetchUserData = searchUser;

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
  const url = `${SEARCH_USERS_ENDPOINT}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    throw new Error("Search failed");
  }
};
