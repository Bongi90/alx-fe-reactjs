// src/components/Search.js

import React, { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);
    setUserData(null);

    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we can\'t find the user.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a GitHub username"
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            'Search'
          )}
        </button>
      </form>

      <div className="h-48 flex items-center justify-center">
        {isLoading && (
          <div className="flex items-center text-blue-400 font-medium">
            <Loader2 className="animate-spin mr-2" size={24} />
            Loading...
          </div>
        )}

        {error && (
          <div className="text-red-400 font-medium text-center">
            {error}
          </div>
        )}

        {userData && !isLoading && !error && (
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-gray-700 p-6 rounded-xl shadow-inner w-full">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`} 
              className="w-24 h-24 rounded-full border-4 border-gray-500 shadow-md"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{userData.name || userData.login}</h2>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:underline flex items-center justify-center sm:justify-start mt-2"
              >
                View Profile
                <Github size={16} className="ml-2" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
