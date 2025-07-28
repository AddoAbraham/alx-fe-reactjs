// src/components/SearchBar.jsx

import React, { useState } from "react";
import { advancedUserSearch } from "../services/githubApi";

const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const users = await advancedUserSearch(username, location, minRepos);
      setResults(users);
    } catch (err) {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        GitHub Advanced User Search
      </h2>
      <div className="flex flex-col space-y-3">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Location (e.g., Ghana)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="p-3 border rounded shadow-sm bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{user.login}</h3>
                <a
                  className="text-blue-500 hover:underline"
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
