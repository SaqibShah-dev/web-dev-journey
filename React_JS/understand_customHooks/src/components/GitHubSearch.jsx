// GitHubSearch.jsx
import useFetch from "../hooks/useFetch";
import { useState } from "react";

function GitHubSearch() {
    const [username, setUsername] = useState("");
    const [searchUrl, setSearchUrl] = useState("");

    const { data: user, loading, error } = useFetch(searchUrl);

    function handleSearch() {
        setSearchUrl(`https://api.github.com/users/${username}`);
    }

    return (
        <div>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && <h2>{user.name}</h2>}
        </div>
    );
}


export default GitHubSearch;