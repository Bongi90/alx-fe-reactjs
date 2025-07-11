import React from 'react';
import './App.css'; 

import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <h1>User Profile Card Example</h1>

      <UserProfile
        name="Alice Johnson"
        age={30} 
        bio="Passionate software developer with a love for open-source projects and continuous learning. Enjoys hiking and playing chess in free time."
      />

      <UserProfile
        name="Bob Smith"
        age={24}
        bio="Graphic designer and aspiring photographer. Always looking for new creative challenges."
      />
    </div>
  );
}

export default App;