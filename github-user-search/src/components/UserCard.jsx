const UserCard = ({ user }) => {
  if (!user)
    return <p className="text-red-500">Looks like we can't find the user.</p>;

  return (
    <div className="border p-4 text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 mx-auto rounded-full"
      />
      <h2 className="text-xl font-bold">{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;
