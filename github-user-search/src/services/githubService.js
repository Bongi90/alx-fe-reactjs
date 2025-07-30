import axios from 'axios';

const BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : '',
  },
});

export const fetchUser = async (username) => {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
};

