const UserCard = ({ user }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <img src={user.avatar_url} alt="avatar" width={100} />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
    </div>
  );
};

export default UserCard;
