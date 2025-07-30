import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { fetchUser } from './services/githubService';

function App() {
  const [userData, setUserData] = useState(null);

  const handleSearch = async (username) => {
    try {
      const data = await fetchUser(username);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      setUserData(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {userData && <UserCard user={userData} />}
    </div>
  );
}

export default App;

