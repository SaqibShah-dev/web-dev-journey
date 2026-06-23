// What is useEffect?
// In simple terms, useEffect is a React Hook that lets you perform side effects in 
// function components. Side effects can include:

// Fetching data from an API
// Subscribing to a service
// Manually updating the DOM
// Setting up timers or intervals
// Before hooks, side effects were typically handled in lifecycle methods like 
// componentDidMount and componentDidUpdate. useEffect now simplifies this process.

// Basic Syntax of useEffect
// Here’s what the most basic useEffect looks like:
// import React, { useState, useEffect } from 'react';
// function ExampleComponent() {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     document.title = `You clicked ${count} times`;
//   });
//   return (
//       <div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(count + 1)}>
//           Click me
//         </button>
//       </div>
//     );
// }

// How It Works
// The useEffect hook takes two arguments:
// A function (your side effect).
// An optional dependency array.
// In the example above:

// Every time the component renders, useEffect updates the document title to reflect 
// the number of times the button was clicked.

// The Dependency Array Explained
// The real power of useEffect comes from controlling when it runs using the dependency array.

// 1. Run on Every Render (No Dependency Array):

// useEffect(() => {
//   console.log('Runs after every render');
// });

// 2. Run Only Once (Empty Dependency Array):

// useEffect(() => {
//   console.log('Runs only once (like componentDidMount)');
// }, []);

// 3. Run When State/Props Change:

// useEffect(() => {
//   console.log('Runs when count changes');
// }, [count]);
// By passing [count] as a dependency, the effect only runs when the count state changes, 
// making it more efficient.

// Cleaning Up Effects
// Sometimes, side effects need cleanup — like removing event listeners or canceling API calls.
//  useEffect lets you return a cleanup function to handle this.

// useEffect(() => {
//   const timer = setInterval(() => {
//     console.log('Interval running');
//   }, 1000);
// return () => {
//     clearInterval(timer);  // Cleanup on unmount
//     console.log('Interval cleared');
//   };
// }, []);

// Real-World Example: Fetching Data
// A common use case for useEffect is fetching data from an API:

// useEffect(() => {
//   async function fetchData() {
//     const response = await fetch('https://api.example.com/data');
//     const data = await response.json();
//     console.log(data);
//   }
  
//   fetchData();
// }, []);
// Here, the API call runs only once when the component mounts.


// Why useEffect Matters
// Mastering useEffect allows you to:

// Handle async data fetching seamlessly.
// Manage subscriptions and event listeners cleanly.
// Avoid unnecessary re-renders by fine-tuning when effects run.
// Whether you’re working on personal projects or large-scale applications, getting
//  comfortable with useEffect can greatly enhance your React skills.

// Why useEffect exists — the problem it solves
// In React, your component function runs (renders) every time state changes. But some 
// code should NOT run on every render — it should only run at specific times:

// function WeatherApp() {
//     const [city, setCity] = useState("Lahore");
//     const [weather, setWeather] = useState(null);

//     // ❌ WRONG — fetching directly in the component body
//     // This runs on EVERY render — infinite loop!
//     fetch(`https://api.weather.com/${city}`)
//         .then(r => r.json())
//         .then(data => setWeather(data)); // setWeather triggers re-render
//         // re-render → fetch again → setWeather → re-render → fetch... 💥

//     return <div>{weather?.temperature}</div>;
// }

// useEffect solves this by letting you say: "run this code, but only when specific things 
// change — not on every render."

// Async in useEffect — important pattern
// You can't make the useEffect callback itself async directly:
// ❌ Wrong — can't make useEffect callback async directly
// useEffect(async () => {
//     const data = await fetchData(); // this causes a warning
// }, []);

// // ✅ Correct — define async function inside, then call it
// useEffect(() => {
//     async function loadData() {
//         const data = await fetchData();
//         setData(data);
//     }

//     loadData(); // call it immediately
// }, []);

// Cleanup function — running code when component unmounts
// useEffect can return a function that React calls when:

// The component is removed from the screen (unmount)
// Before the effect runs again (when dependencies change)

// useEffect(() => {
//     // setup
//     const timer = setInterval(() => {
//         setCount(prev => prev + 1);
//     }, 1000);

//     // cleanup — runs when component unmounts OR before next effect
//     return () => {
//         clearInterval(timer); // stop timer when component disappears
//     };
// }, []);

// Without cleanup, the timer would keep running even after the component is gone — causing 
// memory leaks and errors.

// useEffect lifecycle — connecting to what you know
// Component mounts (first appears on screen)
//         ↓
// React renders the JSX
//         ↓
// useEffect runs (after render)
//         ↓
// State changes → re-render
//         ↓
// If dependencies changed → cleanup previous effect → run effect again
//         ↓
// Component unmounts (removed from screen)
//         ↓
// Cleanup function runs one final time

// import { useState, useEffect } from 'react';
// function App() {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     document.title = `You clicked ${count} times`;

//     const timer = setInterval(() => {
//         setCount(prev => prev + 1);
//     }, 1000);

//     // cleanup — runs when component unmounts OR before next effect
//     return () => {
//         clearInterval(timer); // stop timer when component disappears
//     };
//   },[]);

//   return (
//       <div>
//         <p>You clicked {count} times</p>
//         <button >
//           Click me
//         </button>
//       </div>
//     );
// }
// export default App;



import { useState, useEffect } from 'react';
import ListAndKeys from './ListAndKeys/ListAndKeys';
import CourseList from './ListAndKeys/CourseList';
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;

    const timer = setInterval(() => {
        setCount(prev => prev + 1);
    }, 1000);

    // cleanup — runs when component unmounts OR before next effect
    return () => {
        clearInterval(timer); // stop timer when component disappears
    };
  },[]);

  return (
      <div>
        <p>You clicked {count} times</p>
        <button >
          Click me
        </button>
        <ListAndKeys/>
        <CourseList />
      </div>
    );
}
export default App;
