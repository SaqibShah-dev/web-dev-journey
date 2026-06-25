import { useTheme } from "../context/ThemeContext"; // ✅ named import
import Navbar from "./Navbar";
import Content from "./Content";

function Page() {
    const { theme } = useTheme();

    return (
        <div style={{
            background: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            minHeight: "100vh",
            padding: "20px"
        }}>
            <Navbar />
            <Content />
        </div>
    );
}

export default Page;