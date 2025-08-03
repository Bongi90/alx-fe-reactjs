import axios from 'axios';

export const fetchUserData = async (username) => {
  const apiUrl = `https://api.github.com/users/${username}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};




