export const fetchUserData = async (username) => {
  const apiUrl = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found.');
      }
      throw new Error('An unexpected error occurred.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};




