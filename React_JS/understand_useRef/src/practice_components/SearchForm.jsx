// Uncontrolled input — useRef instead of useState
import { useRef } from "react";
function SearchForm() {
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Search:", inputRef.current.value);
        inputRef.current.value = ""; // clear it directly
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={inputRef} placeholder="Search..." />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;