import { useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            console.log("IN UseLocal Storage ");
            
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    function setStoredValue(newValue) {
        console.log("update val : ",newValue);
        
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, setStoredValue]; 
}

export default useLocalStorage;