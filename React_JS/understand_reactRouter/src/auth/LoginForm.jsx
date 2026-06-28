import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // ✅ returns a real Promise
    function login(email, password) {
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                reject(new Error("Email and password required"));
            } else {
                resolve({ email }); // simulate success
            }
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard"); // ✅ only runs if login resolves
        } catch (err) {
            setError(err.message); // ✅ shows error if login rejects
            console.error("Login failed", err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;