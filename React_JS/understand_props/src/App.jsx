// Props (short for properties) are how you pass data from a parent component to a 
// child component in React.Props (short for properties) are how you pass data from a 
// parent component to a child component in React.
// Think of props like function arguments — you already know how functions take parameters. 
// Props are exactly the same idea, but for components.

// It's worth noting that:

// We use props in both functional and class-based components.
// We pass props from the top to bottom. We can also refer to it as ancestor to descendant, 
// or parent to child.
// Props are read-only. This means that once a component receives a bunch of props, we cannot 
// change it, but we can only use and consume it and cannot modify the properties passed down 
// to the component. If we want to modify that, we'll have to introduce what we call state in 
// React.

// Component with props
// function Greet(props) {
//     return <h1>Hello {props.name}, you are {props.age} years old</h1>;
// }

// // Passing data in (like function arguments, but as HTML attributes)
// <Greet name="Alex" age={25} />
// <Greet name="Sam" age={30} />

// Basic props syntax
// Parent component — passes data DOWN
// function App() {
//     return (
//         <div>
//             <UserCard name="Alex" age={25} city="Lahore" />
//             <UserCard name="Sam" age={30} city="Karachi" />
//         </div>
//     );
// }

// Child component — receives data as 'props' object
// function UserCard(props) {
//     return (
//         <div>
//             <h2>{props.name}</h2>
//             <p>Age: {props.age}</p>
//             <p>City: {props.city}</p>
//         </div>
//     );
// }

// React automatically collects all the attributes you pass and bundles them into 
// one props object:

// When you write this:
{/* <UserCard name="Alex" age={25} city="Lahore" /> */}

// React creates this props object and passes it to UserCard:
// props = {
//     name: "Alex",
//     age: 25,
//     city: "Lahore"
// }

// Destructuring props (the modern, cleaner way)
// Instead of writing props.name, props.age everywhere, destructure props directly in the 
// function parameter — you already know destructuring from Objects!

// Without destructuring (verbose)
// function UserCard(props) {
//     return <h2>{props.name} — {props.age}</h2>;
// }

// With destructuring (clean — this is how most real code looks)
// function UserCard({ name, age, city }) {
//     return (
//         <div>
//             <h2>{name}</h2>
//             <p>{age}</p>
//             <p>{city}</p>
//         </div>
//     );
// }


// Different types of props
// You can pass any JavaScript value as a prop:

// function Demo({
//     name,        // string
//     age,         // number
//     isActive,    // boolean
//     scores,      // array
//     address,     // object
//     onClick,     // function
// }) {
//     return (
//         <div>
//             <p>{name}</p>
//             <p>{age}</p>
//             <p>{isActive ? "Active" : "Inactive"}</p>
//             <p>{scores[0]}</p>
//             <p>{address.city}</p>
//             <button onClick={onClick}>Click me</button>
//         </div>
//     );
// }

// Passing different types
// function App() {
//     return (
//         <Demo
//             name="Alex"                        // string — no {} needed
//             age={25}                            // number — needs {}
//             isActive={true}                     // boolean — needs {}
//             scores={[95, 87, 92]}              // array — needs {}
//             address={{ city: "Lahore" }}        // object — needs {}
//             onClick={() => console.log("Hi!")} // function — needs {}
//         />
//     );
// }

// Rule: strings can use "" directly. Everything else (numbers, booleans, arrays, objects,
//    functions, variables) needs {}.
// Component
//     title="Hello"           // ✅ string — quotes work
//     title={"Hello"}         // ✅ also valid
//     count={42}              // ✅ number needs {}
//     count="42"              // ⚠️ this passes the STRING "42", not the number!
//     isOpen={true}           // ✅ boolean needs {}
//     isOpen                  // ✅ shorthand for isOpen={true}
// />

// Default props — fallback values
// What if a prop isn't passed? You can set default values using destructuring defaults — 
// you already know this pattern from functions!

// function WeatherCard({ city = "Unknown", temp = 0, unit = "C" }) {
//     return (
//         <div>
//             <h2>{city}</h2>
//             <p>{temp}°{unit}</p>
//         </div>
//     );
// }

// All props passed
{/* <WeatherCard city="Lahore" temp={28} unit="C" /> */}
// Output: Lahore — 28°C

// Some props missing — defaults kick in
{/* <WeatherCard city="Karachi" /> */}
// Output: Karachi — 0°C

// Props are READ ONLY — never modify them
// This is the most important rule about props:

// function UserCard({ name, age }) {
//     // ❌ NEVER do this — props are read only!
//     name = "Bob";      // error in strict mode
//     age = age + 1;     // modifying props breaks React's data flow

//     // ✅ if you need to modify, create a local variable
//     const displayName = name.toUpperCase();
//     const nextAge = age + 1;

//     return <h2>{displayName} — {nextAge}</h2>;
// }

// Props only flow downward — from parent to child. If a child needs to send data UP to 
// a parent, you use a callback function passed as a prop (more on this in useState).

// Props only flow downward — from parent to child. If a child needs to send data UP to 
// a parent, you use a callback function passed as a prop (more on this in useState).

// Parent — owns the data and the handler
// function App() {
//     function handleSearch(username) {
//         console.log("Searching for:", username);
//         // fetch data, update state, etc.
//     }

//     return <SearchBar onSearch={handleSearch} />;
//     //                ↑ passing the function as a prop
// }

// Child — calls the function when something happens
// function SearchBar({ onSearch }) {
//     return (
//         <div>
//             <input id="input" type="text" />
//             <button onClick={() => {
//                 const value = document.getElementById("input").value;
//                 onSearch(value); // calls parent's function!
//             }}>
//                 Search
//             </button>
//         </div>
//     );
// }

// When the button is clicked, the child calls onSearch — which is actually the parent's 
// handleSearch function. Data flows: child → up → parent via the callback.


// The children prop — special built-in prop
// React has one special prop called children — it represents whatever you put BETWEEN 
// opening and closing tags of a component:

// Component that uses children
// function Card({ title, children }) {
//     return (
//         <div className="card">
//             <h2>{title}</h2>
//             <div className="card-body">
//                 {children} {/* renders whatever is inside <Card>...</Card> */}
//             </div>
//         </div>
//     );
// }

// Using it — anything between tags becomes 'children'
// function App() {
//     return (
//         <Card title="Weather">
//             <p>Temperature: 28°C</p>
//             <p>Humidity: 62%</p>
//             <button>Refresh</button>
//         </Card>
//     );
// }

import './App.css'

function App() {

  return (
    <>
          </>
  )
}

export default App
