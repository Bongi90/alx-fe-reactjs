import React, { useState } from 'react';
import axios from 'axios';

const githubService = {
  searchGitHubUsers: async (username, location, minRepos, page = 1, perPage = 10) => {
    try {
      let query = username.trim();

      if (location.trim()) {
        query += `+location:${location.trim()}`;
      }

      if (minRepos && !isNaN(minRepos) && minRepos > 0) {
        query += `+repos:>${minRepos}`;
      }

      if (!query) {
        return { items: [], total_count: 0 };
      }

      const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error searching GitHub users:", error);
      throw error;
    }
  }
};


function App() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const perPage = 10;

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSearchResults([]);
    setCurrentPage(1);

    if (!username.trim() && !location.trim() && !minRepos) {
      setError("Please enter at least a username, location, or minimum repositories to search.");
      setLoading(false);
      return;
    }

    try {
      const data = await githubService.searchGitHubUsers(
        username,
        location,
        minRepos,
        1,
        perPage
      );
      setSearchResults(data.items);
      setTotalResults(data.total_count);
      setCurrentPage(1);
    } catch (err) {
      setError("Looks like we can't find any users matching your criteria.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    setError(null);

    const nextPage = currentPage + 1;

    try {
      const data = await githubService.searchGitHubUsers(
        username,
        location,
        minRepos,
        nextPage,
        perPage
      );
      setSearchResults((prevResults) => [...prevResults, ...data.items]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError("Failed to load more users.");
    } finally {
      setLoading(false);
    }
  };

  const showLoadMore = searchResults.length > 0 && searchResults.length < totalResults;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          GitHub User Search
        </h1>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Username (e.g., octocat)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-full md:col-span-1"
          />
          <input
            type="text"
            placeholder="Location (e.g., London)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-full md:col-span-1"
          />
          <input
            type="number"
            placeholder="Min Repos (e.g., 10)"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            min="0"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-full md:col-span-1"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-md col-span-full"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Users'}
          </button>
        </form>

        {loading && (
          <p className="text-center text-blue-600 text-lg">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-600 text-lg">{error}</p>
        )}

        {!loading && !error && searchResults.length === 0 && (username.trim() || location.trim() || minRepos) && (
          <p className="text-center text-gray-500 text-lg">No users found matching your criteria.</p>
        )}

        {searchResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Found {totalResults} Users
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-20 h-20 rounded-full border-2 border-blue-300 mb-3 shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/80x80/cccccc/333333?text=No+Image";
                    }}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 truncate w-full">
                    {user.login}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {location.trim() && <span className="block">Location: {location} (filtered)</span>}
                    {minRepos && <span className="block">Min Repos: {minRepos} (filtered)</span>}
                  </p>

                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out text-sm shadow-sm"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>

            {showLoadMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out shadow-md"
                  disabled={loading}
                >
                  {loading ? 'Loading More...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;




