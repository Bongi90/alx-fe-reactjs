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

export default githubService;




