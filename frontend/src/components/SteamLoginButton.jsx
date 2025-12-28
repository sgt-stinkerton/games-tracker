// todo make prettier

export default function SteamLoginButton ({ }) {

  const handleLink = () => {
    window.location.href = `http://localhost:8080/steam/link?currentUserId=${1}`;
  };

  return (
    <button onClick={handleLink}>
      Link Steam Account
    </button>
  );
};