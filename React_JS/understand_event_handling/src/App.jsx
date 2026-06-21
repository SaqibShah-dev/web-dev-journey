// Event handling in React is how you respond to user actions — clicks, typing, form 
// submissions, key presses, mouse movements, etc.
// If you remember your vanilla JS event handling, React's version is very similar — 
// just with a different syntax.

// Quick comparison — vanilla JS vs React
//  JS
// document.getElementById("btn").addEventListener("click", handleClick);
// // React
// <button onClick={handleClick}>Click me</button>
// Same concept, cleaner syntax. The event listener is directly on the JSX element as a prop.

// The basic syntax
// function App() {
//     function handleClick() {
//         console.log("Button clicked!");
//     }

//     return (
//         <button onClick={handleClick}>Click me</button>
//     );
// }

// Three important things:
// 1. camelCase event names
// // HTML/JS             React
// onclick              →    onClick
// onchange             →    onChange
// onsubmit             →    onSubmit
// onkeydown            →    onKeyDown
// onmouseover          →    onMouseOver

// 2. Pass the function reference, don't call it
// // ❌ WRONG — calls the function immediately when rendering
// <button onClick={handleClick()}>Click</button>

// // ✅ CORRECT — passes function reference, called when clicked
// <button onClick={handleClick}>Click</button>



// The problem — handleClick() with parentheses
// <button onClick={handleClick()}>Click me</button>
// //                          ^^
// //                    these parentheses are the problem!
// When React renders this component, it sees handleClick() and thinks:

// "Oh, this is a function call — let me run it RIGHT NOW"
// So it calls handleClick() immediately during render — that's why you see the alert 
// WITHOUT clicking.

// After handleClick() runs, it returns undefined (the function has no return value). So 
// onClick becomes:
//   <button onClick={undefined}>Click me</button>
//   Now onClick is undefined — clicking the button does nothing, which is exactly 
//   what you're experiencing.

// Simple analogy
// Think of it like giving someone a phone number vs calling them right now:
// // ❌ Calling them right now (wrong)
// onClick={handleClick()}   // "call this person RIGHT NOW"

// // ✅ Giving them the number to call later (correct)
// onClick={handleClick}     // "here's the number, call when button is clicked"

// But what if you need to pass arguments?
// If you need to pass arguments to your handler, you CAN'T just remove the parentheses — 
// you need to wrap it in an arrow function:
// // ❌ Wrong — runs immediately
// <button onClick={handleDelete(id)}>Delete</button>

// // ✅ Correct — arrow function wraps the call
// <button onClick={() => handleDelete(id)}>Delete</button>
// The arrow function () => handleDelete(id) is itself a function reference — React stores
//  it and calls it when clicked. When called, it then calls handleDelete(id).

// 3. Use arrow functions when you need to pass arguments
// // ❌ Can't pass arguments without arrow function
// <button onClick={handleDelete(id)}>Delete</button> // runs immediately!

// // ✅ Wrap in arrow function to pass arguments
// <button onClick={() => handleDelete(id)}>Delete</button>


// Most common events you'll use

// 1. onClick — button clicks, any element click
// function App() {
//     const [count, setCount] = useState(0);

//     return (
//         <div>
//             <button onClick={() => setCount(count + 1)}>+</button>
//             <button onClick={() => setCount(count - 1)}>-</button>
//             <button onClick={() => setCount(0)}>Reset</button>
//             <p>{count}</p>
//         </div>
//     );
// }

// 2. onChange — input, textarea, select

// function App() {
//     const [text, setText] = useState("");

//     return (
//         <div>
//             <input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Type something"
//             />
//             <p>You typed: {text}</p>
//             <p>Length: {text.length}</p>
//         </div>
//     );
// }

// 3. onSubmit — forms
// function LoginForm() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     function handleSubmit(e) {
//         e.preventDefault(); // prevent page refresh!
//         console.log("Email:", email);
//         console.log("Password:", password);
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//             />
//             <button type="submit">Login</button>
//         </form>
//     );
// }

// 4. onKeyDown — keyboard events
// function SearchBar() {
//     const [query, setQuery] = useState("");

//     function handleKeyDown(e) {
//         if (e.key === "Enter") {
//             console.log("Searching for:", query);
//         }
//         if (e.key === "Escape") {
//             setQuery("");
//         }
//     }

//     return (
//         <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Search..."
//         />
//     );
// }

// 5. onMouseEnter / onMouseLeave — hover effects
// function HoverCard() {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <div
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             style={{
//                 background: isHovered ? "lightblue" : "white",
//                 padding: "20px",
//                 transition: "background 0.3s"
//             }}
//         >
//             {isHovered ? "You're hovering!" : "Hover over me"}
//         </div>
//     );
// }

// 6. onFocus / onBlur — input focus
// function SmartInput() {
//     const [isFocused, setIsFocused] = useState(false);

//     return (
//         <input
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             style={{
//                 border: isFocused
//                     ? "2px solid darkcyan"
//                     : "2px solid #ccc"
//             }}
//             placeholder="Click me"
//         />
//     );
// }

// What is Synthetic Event in React

// Synthetic events in React are a unified layer over native browser events, providing a 
// consistent and cross-browser-compatible event handling system. Unlike native DOM events,
//  synthetic events are JavaScript objects created automatically by React when an event 
//  handler function is passed as an argument. This abstraction ensures that events work
//   identically across different browsers, eliminating the inconsistencies often encountered 
//   with native events.

// One of the key features of synthetic events in React is event pooling. Event pooling is a 
// performance optimization technique where React reuses event objects instead of creating 
// new ones for each event. This reduces memory overhead and enhances the performance of your
//  application. When an event handler is invoked, React wraps the underlying browser event 
//  in a synthetic event object, providing a consistent API for accessing event properties.

// By using synthetic events, React developers can write cleaner and more maintainable code,
//  without worrying about the quirks of different browsers. This unified approach simplifies 
//  event handling and ensures that your application behaves consistently across all 
//  platforms.

// The Translation Analogy 🌎
// Imagine you invite four friends from all over the world to your house: one speaks only
//  French, one speaks English, one speaks Japanese, and one speaks Spanish.

// If they all want to say "Hello" or tell you they are hungry, they will use different words.
//  If you had to learn every single one of their languages perfectly to understand them, your
//   brain would get overwhelmed.

// Instead, you hire an Interpreter who stands at the door.

// Whenever a friend says something in their own language (Native Event),

// The interpreter instantly translates it into a standard language you understand 
// perfectly (Synthetic Event).

// React doesn't want you to worry about that. So, it acts as your interpreter:

// A user clicks a button in Chrome or Safari.

// The browser generates a raw Native DOM Event.

// React intercepts it immediately and packs it inside a neat, standardized box called a 
// SyntheticEvent.

// React hands that box to your code.

// Because of this, a click event looks and behaves exactly the same whether your user is on 
// an old Android phone or a brand-new iPhone.

// The 3 Things to Remember 
// 1)It's a Wrapper: It is just a protective, standardized box React puts around the browser's
//  messy native event.

// 2)Use camelCase: In standard HTML, you write onclick. In React, you must write onClick
//  (with a capital C).

// 3)It Saves You Time: You don't have to worry about browser compatibility bugs; React 
// handles them for you automatically.

import { useState } from "react";

function App() {
  const [count,setCount] = useState(0);
      function increment() {
        setCount(prev => {
            alert(prev);
            return prev + 1; // ✅ explicit return
        });
    }

    function decrement() {
        setCount(prev => prev - 1); // ✅ separate decrement
    }
  return (
    <div>
           <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>  {/* ✅ calls decrement */}
            <button onClick={()=>{
              increment();
              increment();
              increment();
            }}>Triple</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <p>{count}</p>
    </div>
  );
}

export default App;