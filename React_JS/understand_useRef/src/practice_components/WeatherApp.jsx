
// Practical example — tracking previous value
// A very common pattern — knowing what a value WAS before it changed:
// import { useState, useRef, useEffect } from "react";



import { useState, useRef, useEffect } from "react";

function WeatherApp() {
    const [city, setCity] = useState("Lahore");
    const previousCity = useRef(""); // remember previous city

    useEffect(() => {
        previousCity.current = city; // update ref after every render
        console.log("Render Weather component");
        
    });

    return (
        <div>
            <p>Current city: {city}</p>
            <p>Previous city: {previousCity.current}</p>
            <button onClick={() => setCity("Karachi")}>Karachi</button>
            <button onClick={() => setCity("Islamabad")}>Islamabad</button>
        </div>
    );
}

export default WeatherApp;

// Why useRef and not useState for previousCity? Because updating previousCity should NOT 
// trigger a re-render — it's just extra information, not something that should cause the 
// UI to update.