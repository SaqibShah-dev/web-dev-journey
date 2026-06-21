// // ❌ This does NOT work
// function App() {
//     let count = 0; // regular variable

//     function increment() {
//         count = count + 1;
//         console.log(count); // value changes in console...
//         // but UI never updates! React doesn't know count changed
//     }

//     return (
//         <div>
//             <p>{count}</p> {/* always shows 0 */}
//             <button onClick={increment}>+</button>
//         </div>
//     );
// }

// export default App;

// Why doesn't this work? Because React only re-renders a component when it's told something 
// changed. A regular variable changing in memory doesn't tell React anything — React has no 
// idea it needs to update the UI.
// useState solves this — it gives you a special variable that React watches. When it changes, 
// React knows to re-render.

// import { useState } from 'react';

// const App = () => {
//   const [count, setCount] = useState(0);


//   This returns an array of exactly 2 things:
// [count, functionToUpdateIt]
//      ↑                ↑
//   what it is     how to change it

// You destructure it immediately — this is standard React pattern:
// const [count, setCount] = useState(0);
//     ↑           ↑              ↑
// current    updater fn      starting value
// Naming convention: if your state is called x, the updater is always called setX. 
// This is a strong React convention you'll see everywhere.


//   return (
//     <div>
//             <h2>Count: {count}</h2>
//             <button onClick={() => setCount(count + 1)}>+</button>
//             <button onClick={() => setCount(count - 1)}>-</button>
//             <button onClick={() => setCount(0)}>Reset</button>
//         </div>
//   );
// }

// export default App;


// What happens step by step when you click +:
// 1. Button clicked → onClick fires
// 2. setCount(count + 1) called → setCount(1)
// 3. React sees state changed
// 4. React re-runs Counter() function with count = 1
// 5. New JSX returned: <h2>Count: 1</h2>
// 6. React updates only the changed part in real DOM
// 7. You see "Count: 1" on screen
// Every click repeats this cycle. This is the React render cycle.


// useState with different data types
// useState can hold ANY JavaScript value:
// String:
// import { useState } from "react";
// function App() {
//     const [name, setName] = useState(""); // starts empty

//     return (
//         <div>
//             <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//             />
//             <p>Hello, {name || "stranger"}!</p>
//         </div>
//     );
// }

// export default App;


// Boolean:
// import { useState } from "react";
// function App() {
//     const [isVisible, setIsVisible] = useState(false);

//     return (
//         <div>
//             <button onClick={() => setIsVisible(!isVisible)}>
//                 {isVisible ? "Hide" : "Show"}
//             </button>

//             {isVisible && <p>Now you see me!</p>}
//         </div>
//     );
// }

// export default App;


// Array:
// import { useState } from "react";
// function App() {
//     const [tasks, setTasks] = useState(["Buy groceries", "Walk dog"]);
//     const [input, setInput] = useState("");

//     function addTask() {
//         if (input === "") return;
//         setTasks([...tasks, input]); // spread existing + add new
//         setInput("");
//     }

//     function removeTask(index) {
//       console.log(index);
      
//         setTasks(tasks.filter((_, i) => i !== index));
//     }

//     return (
//         <div>
//             <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="New task"
//             />
//             <button onClick={addTask}>Add</button>

//             <ul>
//                 {tasks.map((task, index) => (
//                     <li key={index}>
//                         {task}
//                         <button onClick={() => removeTask(index)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
// export default App;


// Object:
import { useState } from "react";
function App() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        city: ""
    });

    function handleChange(field, value) {
        setUser({ ...user, [field]: value }); // spread + update one field
    }

    return (
        <div>
            <input
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
            />
            <input
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email"
            />
            <input 
              value={user.city}
              onChange={(e)=>handleChange("city",e.target.value)}
              placeholder="Enter City"
              />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}
export default App;


// What "snapshot" means
// When React runs your component, it takes a snapshot of all state values at that moment. 
// Every line of code in that render uses those frozen values — even after calling setAge.
// javascript// Imagine age = 42 at the start of this render

// function handleClick() {
//     setAge(age + 1); // setAge(42 + 1) → schedules age = 43
//     setAge(age + 1); // setAge(42 + 1) → schedules age = 43 (same!)
//     setAge(age + 1); // setAge(42 + 1) → schedules age = 43 (same!)
// }

// age is still 42 on ALL three lines — because React hasn't re-rendered yet. You're 
// reading the same frozen snapshot three times, so all three calls say "set age to 43."

// Why React works this way — batching
// React intentionally batches all state updates in one event handler and re-renders ONCE at 
// the end, not after every setAge call. This is called batching.
//function handleClick() {
//     setAge(age + 1);  // queued
//     setAge(age + 1);  // queued
//     setAge(age + 1);  // queued
// }
// // ↓ handleClick finishes
// // React processes all queued updates
// // Renders ONCE with final result
// This is actually a performance optimization — imagine if React re-rendered after every 
// single setAge call — three re-renders instead of one. For complex UIs that's very wasteful.

// The fix — use the functional updater form
// Instead of reading age directly (which is frozen), pass a function to setAge. React 
// calls this function with the most up-to-date value, not the frozen snapshot:
// function handleClick() {
//     setAge(prev => prev + 1); // prev = 42, returns 43
//     setAge(prev => prev + 1); // prev = 43, returns 44
//     setAge(prev => prev + 1); // prev = 44, returns 45
// }
// age is now 45 ✅ — incremented 3 times!


// Why React does this — performance
// Imagine React re-rendered after EVERY state update:
// function handleClick() {
//     setName("Alex");
//     // 🔄 re-render 1 — name="Alex", age=0, city=""
    
//     setAge(25);
//     // 🔄 re-render 2 — name="Alex", age=25, city=""
    
//     setCity("Lahore");
//     // 🔄 re-render 3 — name="Alex", age=25, city="Lahore"
// }

// With batching:
// function handleClick() {
//     setName("Alex");   // queued
//     setAge(25);        // queued
//     setCity("Lahore"); // queued
// }
// // handleClick finishes
// // 🔄 ONE re-render — name="Alex", age=25, city="Lahore"
// One re-render, correct final state, no flickering.