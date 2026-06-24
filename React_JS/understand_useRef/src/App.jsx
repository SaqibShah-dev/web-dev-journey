// Introduction to useRef
// The useRef hook in React is a function that returns a mutable ref object whose .current 
// property is initialized to the passed argument (initialValue). The returned object will
//  persist for the full lifetime of the component. Updating ref.current does not trigger a 
//  re-render.

// A few important rules:
// Do not read or write ref.current during rendering. React only guarantees the ref's value is 
// settled after commit; mutating it during render makes components impure and is disallowed.
// It is fine (and expected) to read or write ref.current inside event handlers, effects, or
//  callbacks.

// useRef, like the name suggests, lets you create a reference to a value. This reference 
// is in the form of an object, called a ref object. The ref object has a current property
//  that stores the value. The ref object is mutable; you can change its current property 
//  and read it.

// Two main uses of useRef
// 1. Accessing DOM elements directly (like document.getElementById)
// 2. Storing values that persist between renders without triggering re-renders


// Use case 1: Accessing DOM elements
// Sometimes you need to directly interact with a DOM element — focus an input, measure its 
// size, play a video, etc. In React you normally avoid touching the DOM directly, but some 
// things genuinely require it.
// This is where useRef comes in — it gives you a reference to the actual DOM element:

// import { useRef } from "react";

// function SearchBar() {
//     const inputRef = useRef(null); // create a ref, starts as null

//     function focusInput() {
//         inputRef.current.focus(); // directly access the DOM element!
//     }

//     return (
//         <div>
//             <input ref={inputRef} placeholder="Search..." />
//             //          ↑ attach ref to this element
//             <button onClick={focusInput}>Focus Input</button>
//         </div>
//     );
// }
// inputRef.current gives you the actual DOM node — same as what document.getElementById() 
// would return.

// How useRef works
// const myRef = useRef(initialValue);
// useRef returns an object with ONE property — current:
// {
//     current: initialValue // starts as whatever you pass in
// }
// When you attach it to a JSX element with ref={myRef}, React sets myRef.current to 
// that DOM element after rendering:

// const inputRef = useRef(null);
// // Before render: { current: null }

// <input ref={inputRef} />
// // After render:  { current: <input DOM element> }

// // Now you can use it:
// inputRef.current.focus();
// inputRef.current.value;
// inputRef.current.scrollIntoView();

// Practical DOM examples
// Auto-focus input on page load:

// import { useRef, useEffect } from "react";

// function SearchPage() {
//     const inputRef = useRef(null);

//     useEffect(() => {
//         inputRef.current.focus(); // focus when component mounts
//     }, []);

//     return (
//         <input
//             ref={inputRef}
//             placeholder="Search GitHub user..."
//         />
//     );
// }

// This is something you can't do with just useState — you need a direct reference to 
// the DOM element.

// Getting input value without controlled input:
// Uncontrolled input — useRef instead of useState
// function SearchForm() {
//     const inputRef = useRef(null);

//     function handleSubmit(e) {
//         e.preventDefault();
//         console.log("Search:", inputRef.current.value);
//         inputRef.current.value = ""; // clear it directly
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input ref={inputRef} placeholder="Search..." />
//             <button type="submit">Search</button>
//         </form>
//     );
// }

// Use case 2: Storing values without re-rendering
// This is the less obvious but equally important use of useRef. Sometimes you need to 
// remember a value between renders, but changing it should NOT trigger a re-render.
// The difference between useState and useRef:
// RenderChecker Component


// DOM access:
// ✅ Auto-focus an input on mount
// ✅ Scroll to element
// ✅ Get element dimensions (width, height)
// ✅ Play/pause video or audio
// ✅ Read input value without controlled input

// Storing values:
// ✅ Timer ID (setTimeout/setInterval)
// ✅ Previous state value
// ✅ Render count (for debugging)
// ✅ AbortController (cancel fetch)
// ✅ Any value that changes but shouldn't trigger re-render


import RenderChecker from "./practice_components/RenderChecker";
import SearchForm from "./practice_components/SearchForm"
import { useState } from "react";
import { useRef, useEffect } from "react";
import WeatherApp from "./practice_components/WeatherApp";

function App() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();

    // 2. Change the text color inside the input to red (Fixed Syntax)
    if (inputRef.current) {
      inputRef.current.style.color = "red";
    }

    console.log("useEFFECT RUN");

  }, []);
  useEffect(() => {
    renderCount.current += 1; // increment on every render — no re-render triggered
  });

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Search GitHub user..."
      />
      <RenderChecker />

      <SearchForm />

      <WeatherApp />

      <div>
        <p>Count: {count}</p>
        <p>Rendered {renderCount.current} times</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
      </div>
    </>
  );
}

export default App;