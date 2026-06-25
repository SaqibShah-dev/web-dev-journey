import { useTheme } from "../context/ThemeContext";
function Content() {
    const { theme } = useTheme();

    return (
        <main>
            <p>Current theme: {theme}</p>
        </main>
    );
}

export default Content;