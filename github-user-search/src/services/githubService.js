const GITHUB_API_BASE = "https://api.github.com";

// Basic search by username
export const searchUser = async (username) => {
  const res = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return await res.json();
};

// Advanced search by username, location, and minimum repo count
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

  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");

  const data = await res.json();
  return data.items; // return users array
};
