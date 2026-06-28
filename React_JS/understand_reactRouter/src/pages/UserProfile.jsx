// pages/UserProfile.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function UserProfile() {
    const { id } = useParams(); // reads :id from the URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://api.github.com/users/${id}`)
            .then(r => r.json())
            .then(data => setUser(data));
    }, [id]); // refetch when id changes

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <img src={user.avatar_url} width={100} alt="avatar" />
            <h1>{user.name || user.login}</h1>
            <p>{user.bio}</p>
            <p>Followers: {user.followers}</p>
        </div>
    );
}

export default UserProfile;


// When user visits /users/octocat:

// useParams() returns { id: "octocat" }
// fetch runs with octocat
// Shows Octocat's profile