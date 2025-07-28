// src/components/Search.jsx

import React, { useState } from "react";
import { searchUser } from "../services/githubApi";

const Search = () => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await searchUser(query);
      setUserData(data);
    } catch (err) {
      alert("User not found!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Basic GitHub User Search
      </h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {userData && (
        <div className="p-4 border rounded shadow">
          <div className="flex items-center space-x-4">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {userData.name || userData.login}
              </h3>
              <p className="text-gray-600">{userData.bio}</p>
              <a
                href={userData.html_url}
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
