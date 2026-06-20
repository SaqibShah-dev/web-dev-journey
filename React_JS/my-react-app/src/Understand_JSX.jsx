
// JSX stands for JavaScript XML. It's a syntax extension that lets you write 
//    HTML-like code directly inside JavaScript.

// Take a look at the below code:
// const jsx = <h1>This is JSX</h1>

// This is simple JSX code in React. But the browser does not understand this JSX 
// because it's not valid JavaScript code. This is because we're assigning an HTML 
// tag to a variable that is not a string but just HTML code.

// So to convert it to browser understandable JavaScript code, we use a tool like Babel 
// which is a JavaScript compiler/transpiler.
// Babel is a JavaScript compiler


// This is JSX — looks like HTML inside a JS function
// function Greeting() {
//     return <h1>Hello, World!</h1>;
// }

// When the Babel executes the above JSX, it converts it to the following code:
// function Greeting() {
//     return React.createElement("h1", null, "Hello, World!");
// }

//So React introduced the JSX way of writing code which makes code easy to write and understand.
// Knowing how to convert JSX to React.createElement is very important as a React 
// developer (it's also a popular interview question).

// What is the React.createElement Function?
// Every JSX is converted to the React.createElement function call that the browser 
//     understands.
// The React.createElement has the following syntax:
// React.createElement(type, [props], [...children])

// Let’s look at the parameters of the createElement function.

// type :can be an HTML tag like h1, div or it can be a React component
// props: are the attributes you want the element to have
// children "contain other HTML tags or can be a component

// The React.createElement call will also be converted to the object representation 
//     like this:
// {   
//  type: 'h1',   
//  props: {     
//    children: 'This is JSX'   
//  }
// }



// JSX is NOT HTML — key differences
// This trips up every beginner. JSX looks like HTML but has important differences:
// 1. className instead of class
// jsx// ❌ HTML way — won't work in JSX
// <div class="card">Hello</div>

// // ✅ JSX way
// <div className="card">Hello</div>
// Because class is a reserved keyword in JavaScript (you just learned classes!), 
// JSX uses className instead.

// 2. htmlFor instead of for
// jsx// ❌ HTML way
// <label for="input">Name:</label>
// // ✅ JSX way
// <label htmlFor="input">Name:</label>
// Same reason — for is a reserved word in JavaScript (for loops).


// 3. All tags must be closed
// jsx// ❌ HTML allows this
// <input type="text">
// <br>
// <img src="photo.png">

// // ✅ JSX requires self-closing
// <input type="text" />
// <br />
// <img src="photo.png" />


// 4. camelCase for attributes and events
// ❌ HTML way
// <button onclick="handleClick()">Click</button>
// <div style="background-color: red;">

// // ✅ JSX way
// <button onClick={handleClick}>Click</button>
// <div style={{ backgroundColor: "red" }}>

// 5. Style is an object, not a string
// jsx// ❌ HTML — style is a string
// <p style="color: red; font-size: 16px;">Hello</p>

// // ✅ JSX — style is a JavaScript object
// <p style={{ color: "red", fontSize: "16px" }}>Hello</p>
//          ↑ outer {} = JS expression
//            ↑ inner {} = the object itself


// The { } curly braces — most important JSX concept
// Curly braces { } are how you escape from JSX back into JavaScript. Anything inside { } 
//      is regular JavaScript:
// function WeatherCard() {
//     const city = "Lahore";
//     const temp = 28;
//     const isHot = temp > 25;

//     return (
//         <div>
//             <h2>{city}</h2>                          {/* variable */}
//             <p>{temp}°C</p>                          {/* variable */}
//             <p>{10 + 5}</p>                          {/* expression */}
//             <p>{isHot ? "Hot day!" : "Cool day!"}</p> {/* ternary */}
//             <p>{temp * 9/5 + 32}°F</p>               {/* calculation */}
//             <p>{city.toUpperCase()}</p>               {/* method call */}
//         </div>
//     );
// }

// What you CAN put inside { }:
// Variables
// Expressions (math, ternary)
// Function calls
// Array methods like .map()

// What you CANNOT put inside { }:
// if/else statements (use ternary instead)
// for loops (use .map() instead)
// Variable declarations (const, let)

// ❌ if/else doesn't work inside JSX { }
{/* <div>
    {if (isHot) { <p>Hot!</p> }} // SyntaxError!
</div>

// ✅ use ternary instead
<div>
    {isHot ? <p>Hot!</p> : <p>Cool!</p>}
</div>

// ✅ or use && for "show only if true"
<div>
    {isHot && <p>Hot!</p>}
</div> */}

// JSX must return ONE parent element

// ❌ returning two elements at the same level — Error!
// function App() {
//     return (
//         <h1>Title</h1>
//         <p>Paragraph</p>
//     );
// }

// ✅ wrap in a parent div
// function App() {
//     return (
//         <div>
//             <h1>Title</h1>
//             <p>Paragraph</p>
//         </div>
//     );
// }

// // ✅ or use a Fragment (no extra div in the real DOM)
// function App() {
//     return (
//         <>
//             <h1>Title</h1>
//             <p>Paragraph</p>
//         </>
//     );
// }

{/* <>...</> is called a Fragment — it groups elements without adding an extra <div> to 
the DOM. Very commonly used. */}

// JSX with arrays — you'll use this constantly
// You already know .map() from Arrays — in React/JSX you use it to render lists:
// function ForecastList() {
//     const days = [
//         { id: 1, name: "Mon", temp: 30 },
//         { id: 2, name: "Tue", temp: 28 },
//         { id: 3, name: "Wed", temp: 25 },
//     ];

//     return (
//         <ul>
//             {days.map(day => (
//                 <li key={day.id}>
//                     {day.name}: {day.temp}°C
//                 </li>
//             ))}
//         </ul>
//     );
// }

// The key prop is required — React uses it to track list items efficiently during re-renders. 
// Always use a unique, stable value (like an id) — never use the array index if items can be 
// reordered or deleted.

// Conditional rendering patterns
// These are the 3 most common ways to show/hide elements in JSX:

// function WeatherApp() {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [weather, setWeather] = useState(null);

//     return (
//         <div>
//             {/* Pattern 1: && (show if true) */}
//             {loading && <p>Loading...</p>}

//             {/* Pattern 2: && with not (show if false) */}
//             {!loading && <button>Search</button>}

//             {/* Pattern 3: ternary (show one or the other) */}
//             {error
//                 ? <p style={{ color: "red" }}>{error}</p>
//                 : <p style={{ color: "green" }}>Ready!</p>
//             }

//             {/* Pattern 4: && for optional sections */}
//             {weather && (
//                 <div className="weather-card">
//                     <h2>{weather.city}</h2>
//                     <p>{weather.temp}°C</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// This replaces ALL the .classList.add("hidden") / .classList.remove("hidden") you 
// were doing in vanilla JS — you just conditionally include or exclude the element 
// from JSX.

// JSX is compiled — what actually runs in the browser
// Let's trace your JSX all the way to what runs in the browser:

// What YOU write:
// function Card({ name, temp }) {
//     return (
//         <div className="card">
//             <h2>{name}</h2>
//             <p>{temp}°C</p>
//         </div>
//     );
// }

// What BABEL compiles it to:
// function Card({ name, temp }) {
//     return React.createElement(
//         "div",
//         { className: "card" },
//         React.createElement("h2", null, name),
//         React.createElement("p", null, temp + "°C")
//     );
// }

// What React.createElement RETURNS (Virtual DOM node):
// {
//     type: "div",
//     props: {
//         className: "card",
//         children: [
//             { type: "h2", props: { children: "Lahore" } },
//             { type: "p",  props: { children: "28°C" } }
//         ]
//     }
// }

// What finally appears in the real DOM:
{/* <div class="card">
    <h2>Lahore</h2>
    <p>28°C</p>
</div> */}
// You write JSX → Babel compiles → React creates Virtual DOM → React updates real DOM.

const Understand_JSX = () => {
  return (
    <div>
    </div>
  );
}

export default Understand_JSX;
