import React from 'react';

const UserProfile = (props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '8px', maxWidth: '300px', backgroundColor: '#f9f9f9', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
      {/* Display the user's name */}
      <h2>{props.name}</h2>
      {/* Display the user's age */}
      <p><strong>Age:</strong> {props.age}</p>
      {/* Display the user's bio */}
      <p><strong>Bio:</strong> {props.bio}</p>
    </div>
  );
};

export default UserProfile;