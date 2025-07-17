const UserProfile = (props) => {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        maxWidth: '300px',
        backgroundColor: '#f9f9f9',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ color: 'blue', marginBottom: '10px' }}>{props.name}</h2>
      <p>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p>{props.bio}</p>
    </div>
  );
};

export default UserProfile;
