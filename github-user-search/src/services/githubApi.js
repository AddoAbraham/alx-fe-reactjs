export const advancedUserSearch = async (username, location, minRepos) => {
  const queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(" ");
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.items;
};
