import React, { useState } from "react";
import { advancedUserSearch, fetchUserData } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setSingleUser(null);
    setError(null);

    try {
      const users = await advancedUserSearch(query, location, minRepos);
      if (users.length > 0) {
        setResults(users);
      } else {
        const user = await fetchUserData(query);
        setSingleUser(user);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-800">
        GitHub User Search
      </h2>
      <form onSubmit={handleSearch} className="space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum Repositories"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 p-3 border rounded bg-gray-100"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{user.login}</h3>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {singleUser && (
        <div className="mt-6 p-4 border rounded shadow">
          <div className="flex items-center space-x-4">
            <img
              src={singleUser.avatar_url}
              alt={singleUser.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {singleUser.name || singleUser.login}
              </h3>
              <p className="text-gray-600">{singleUser.bio}</p>
              <a
                href={singleUser.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
