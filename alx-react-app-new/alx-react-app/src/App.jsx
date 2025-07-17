import React from 'react';
import './App.css';


import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <h1>User Profile Card Example</h1>
      {/*  UserProfile */}
      <UserProfile
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />

      {/* second UserProfile */}
      {/*
      <UserProfile
        name="Bob Smith"
        age={24}
        bio="Graphic designer and aspiring photographer. Always looking for new creative challenges."
      />
      */}
    </div>
  );
}

export default App;