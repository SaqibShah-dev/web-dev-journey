// Custom hooks are functions that start with use and let you extract and reuse stateful 
// logic across multiple components.


// The problem they solve
// Imagine you have this fetch logic in your GitHub search component:

// function GitHubSearch() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     async function fetchUser(username) {
//         setLoading(true);
//         setError("");
//         try {
//             const response = await fetch(
//                 `https://api.github.com/users/${username}`
//             );
//             if (!response.ok) throw new Error("User not found");
//             const data = await response.json();
//             setUser(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return ( ... );
// }

// Now imagine you need the SAME fetch logic in your Weather app, your Task Manager, and five 
// other components. Do you copy-paste all of it everywhere?
// That's exactly what custom hooks solve — write once, use everywhere.

// What is a custom hook?
// A custom hook is just a regular JavaScript function that:

// Starts with use (required — this is how React identifies it as a hook)
// Can call other hooks inside it (useState, useEffect, useRef etc.)
// Returns whatever the component needs


// Rules of custom hooks
// Custom hooks follow the same rules as all React hooks:
// 1. Name must start with 'use'
//    ✅ useFetch, useLocalStorage, useDebounce
//    ❌ fetchData, getData, myHook

// 2. Only call hooks at the top level
//    ✅ useState, useEffect at top of hook
//    ❌ inside if statements, loops, nested functions

// 3. Only call hooks from React functions
//    ✅ Inside components or other custom hooks
//    ❌ In regular JavaScript functions

import ContactForm from "./components/ContactForm";
import GitHubSearch from "./components/GitHubSearch";
import TaskManager from "./components/TaskManager";
const App = () => {
  return (
    <div>
      <GitHubSearch />
      <TaskManager />
      <ContactForm />
    </div>
  );
}

export default App;
