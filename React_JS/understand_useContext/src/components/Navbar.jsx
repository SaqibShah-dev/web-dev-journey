import { useTheme } from "../context/ThemeContext";
function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                Switch to {theme === "dark" ? "light" : "dark"} mode
            </button>
        </nav>
    );
}

export default Navbar;