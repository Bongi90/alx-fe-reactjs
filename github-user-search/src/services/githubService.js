import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const fetchUsers = async (username, location, minRepos) => {
  let query = `user:${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const response = await axiosInstance.get(`/search/users?q=${query}`);
  return response.data.items;
};


