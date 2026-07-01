import {useQuery} from "@tanstack/react-query";

const GitHubSearch = ({username}) => {
    const {data:user,isLoading,error} = useQuery({
        queryKey: ['user', username],
        queryFn:async () => {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error("User not found");
            return response.json();
        },
        enabled: !!username
    });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <div>
            <img src={user.avatar_url} width={100} alt="avatar" />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      )}
    </div>
  );
}

export default GitHubSearch;

