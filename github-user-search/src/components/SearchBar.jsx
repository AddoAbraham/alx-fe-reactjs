import React, { useState } from "react";
import { searchUser } from "../services/githubApi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await searchUser(query);
      setUserData(data);
      console.log(data);
    } catch (err) {
      alert("User not found!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {userData && (
        <div>
          <h3>{userData.name || userData.login}</h3>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
