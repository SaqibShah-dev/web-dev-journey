import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (credentials) => {
        return new Promise((resolve, reject) => {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const foundUser = users.find(u => u.email === credentials.email);

            if (!foundUser || foundUser.password !== credentials.password) {
                reject(new Error("Invalid email or password"));
                return;
            }

            localStorage.setItem("user", JSON.stringify(foundUser));
            setUser(foundUser);
            resolve(foundUser);
        });
    };

    const register = (userData) => {
        return new Promise((resolve, reject) => {
            const users = JSON.parse(localStorage.getItem("users") || "[]");

            if (users.some(u => u.email === userData.email)) {
                reject(new Error("Email already registered"));
                return;
            }

            const updatedUsers = [...users, userData];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            resolve(userData);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);