// hooks/useFetch.js
import { useState, useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!url) return; // don't fetch if no url

        async function fetchData() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch");
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]); // refetch when url changes

    return { data, loading, error }; // return what components need
}

export default useFetch;