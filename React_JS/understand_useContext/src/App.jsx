// Why useContext?
// The useContext hook provides a way to share data globally across components in React. 
// It works with a context object created using React.createContext. Once a context is created,
//  it can be accessed by any child component using useContext.

// useContext is a React hook that lets you share data across multiple components without 
// passing props through every level — solving a problem called prop drilling.
// The problem — prop drilling
// First, let's understand what problem useContext solves.
// Imagine you have a user object that many components need:
// function App() {
//     const [user, setUser] = useState({ name: "Alex", theme: "dark" });

//     return <Dashboard user={user} />; // passing user down
// }

// function Dashboard({ user }) {
//     return <Sidebar user={user} />; // just passing it along...
// }

// function Sidebar({ user }) {
//     return <UserProfile user={user} />; // still passing...
// }

// function UserProfile({ user }) {
//     return <h2>Hello, {user.name}!</h2>; // FINALLY used here
// }

// Dashboard and Sidebar don't even USE user — they're just passing it down to the next level. 
// This is prop drilling — data "drills" through components that don't need it just to reach 
// one that does.
// How useContext works — 3 steps
// Step 1: Create a Context (outside components)
// Step 2: Provide the context value (wrap components with Provider)
// Step 3: Consume the context value (useContext in any child)

// Step 1: Create a Context
// import { createContext } from "react";
// // Creates a "channel" that components can subscribe to
// const UserContext = createContext(null);
// //                                ↑ default value (used if no Provider above)
// Convention: name it with a capital letter ending in "Context".

// Step 2: Provide the context value
// Wrap your component tree with the Context Provider — any component inside can now access 
// the value:
// function App() {
//     const [user, setUser] = useState({ name: "Alex", theme: "dark" });

//     return (
//         <UserContext.Provider value={user}>
//             {/* everything inside can access 'user' */}
//             <Dashboard />
//         </UserContext.Provider>
//     );
// }

// The value prop is what gets shared — it can be anything: object, string, number, function,
//  array.


// Step 3: Consume the context value
// Any component inside the Provider can now grab the value directly — no props needed:
// import { useContext } from "react";
// function UserProfile() {
//     const user = useContext(UserContext); // grab value directly!

//     return <h2>Hello, {user.name}!</h2>;
// }

// When to use useContext vs props
// This is important — useContext is NOT always the right choice:

// Use PROPS when:
// ✅ Passing data 1-2 levels deep
// ✅ The data is specific to a parent-child relationship
// ✅ You want clear, explicit data flow

// const <UserCard user={user} /> // clear where data comes from

// Use CONTEXT when:
// ✅ Data needed by many components at different levels
// ✅ Global state (theme, user, language, cart)
// ✅ Avoiding prop drilling through 3+ levels

// const { user } = useAuth(); // accessed from anywhere


// Key Benefits of useContext
// Avoids Prop Drilling: You don’t need to pass props through every component layer.
// Centralized State Management: Share global data like user information, theme, or language 
// settings.
// Scalable Design: By modularizing the provider and consumer logic, your app remains maintainable.

import { useState } from "react";
import Dashboard from "./components/Dashboard";
import UserContext from "./context/UserContext"
import ThemeProvider from "./components/ThemeProvider"
import Page from "./components/Page"
const App = () => {
   const [user, setUser] = useState({ name: "Alex", theme: "dark" });
  return (
    <div>
      {/* <UserContext.Provider value={user}>
            <Dashboard />
        </UserContext.Provider> */}

        <ThemeProvider>
          <Page />
        </ThemeProvider>
    </div>
  );
}

export default App;
