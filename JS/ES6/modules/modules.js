// What are Modules?
// Modules are JavaScript’s built-in way to organize code into separate files, each 
// with its own scope. Unlike IIFEs and namespaces (which are patterns), modules are 
// a language feature.
// The export statement makes functions, objects, or values available to other modules.
//  The import statement brings them in.

// math.js — A module file
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// main.js — Another module that uses math.js
import { add, subtract, PI } from './math.js';

console.log(add(2, 3));        // 5
console.log(subtract(10, 4));  // 6
console.log(PI);               // 3.14159


// Why Modules are Better
// Feature	                  IIFE/Namespace	                  ES6 Modules
// File-based	                No (one big file)	            Yes (one module per file)
// True privacy	                Partial (IIFE only)         	Yes (unexported = private)
// Dependency management        Manual	                        Automatic (import/export)
// Static analysis	             No	                            Yes (tools can analyze)
// Tree shaking              	No	                            Yes (remove unused code)
// Browser support	           Always	                        Modern browsers + bundlers

// How to Use Modules
// In the Browser
// Add type="module" to use ES6 modules
//  <script type="module" src="main.js"></script> *

//  Or inline 
{/* <script type="module">
  import { greet } from './utils.js';
  greet('World');
</script> */}

// In Node.js
// Option 1: Use .mjs extension
// math.mjs
// export function add(a, b) { return a + b; }
// Option 2: Add "type": "module" to package.json
// Then use .js extension normally

// Exporting: Sharing Your Code
// There are two types of exports: named exports and default exports.

// Named Exports
// Named exports let you export multiple things from a module. Each has a name.
// utils.js

// Export as you declare
// export const PI = 3.14159;

// export function square(x) {
//   return x * x;
// }

// export class Calculator {
//   add(a, b) { return a + b; }
// }

// // Or export at the end
// const E = 2.71828;
// function cube(x) { return x * x * x; }

// export { E, cube };

// Default Export
// Each module can have ONE default export. It’s the “main” thing the module provides.

// greeting.js

// Default export — no name needed when importing
// export default function greet(name) {
//   return `Hello, ${name}!`;
// }

// // You can have named exports too
// export const defaultName = "World";

// Another example — default exporting a class
// User.js

// export default class User {
//   constructor(name) {
//     this.name = name;
//   }
  
//   greet() {
//     return `Hi, I'm ${this.name}`;
//   }
// }

// When to Use  Named Exports
// Use when:
// You’re exporting multiple things
// You want clear, explicit imports
// You want to enable tree-shaking
// // utils.js
// export function formatDate(date) { /* ... */ }
// export function formatCurrency(amount) { /* ... */ }
// export function formatPhone(number) { /* ... */ }

// // Import only what you need
// import { formatDate } from './utils.js';


// When to Use Each Default Export
// Use when:
// The module has one main purpose
// You’re exporting a class or component
// The import name doesn’t need to match
// // Button.js — React component
// export default function Button({ label }) {
//   return <button>{label}</button>;
// }

// // Import with any name
// import MyButton from './Button.js';


// Importing: Using Other People’s Code
// ​
// Named Imports
// Import specific things by name (must match the export names):
// // Import specific items
// import { PI, square } from './utils.js';

// // Import with a different name (alias)
// import { PI as pi, square as sq } from './utils.js';

// // Import everything as a namespace object
// import * as Utils from './utils.js';
// console.log(Utils.PI);
// console.log(Utils.square(4));

// Default Import
// Import the default export with any name you choose:
// // The name doesn't have to match the export name
// import greet from './greeting.js';

// // In a DIFFERENT file, you could use a different name:
// // import sayHello from './greeting.js';  // Same function, different name
// // import xyz from './greeting.js';        // Still the same function!

// // Combine default and named imports
// import greet, { defaultName } from './greeting.js';

// Side-Effect Imports
// Sometimes you just want to run a module’s code without importing anything:
// This runs the module but imports nothing
// import './polyfills.js';
// import './analytics.js';

// Useful for:
// - Polyfills that add global features
// - Initialization code
// - CSS (with bundlers)

// Import Syntax Summary
// Named imports
// import { a, b, c } from './module.js';

// Named import with alias
// import { reallyLongName as short } from './module.js';

// Default import
// import myDefault from './module.js';

// Default + named imports
// import myDefault, { a, b } from './module.js';

// Import all as namespace
// import * as MyModule from './module.js';

// Side-effect import
// import './module.js';



// Organizing a Real Project
// Let’s see how modules work in a realistic project structure:

// my-app/
// ├── index.html
// ├── src/
// │   ├── main.js           # Entry point
// │   ├── config.js         # App configuration
// │   ├── utils/
// │   │   ├── index.js      # Re-exports from utils
// │   │   ├── format.js
// │   │   └── validate.js
// │   ├── services/
// │   │   ├── index.js
// │   │   ├── api.js
// │   │   └── auth.js
// │   └── components/
// │       ├── index.js
// │       ├── Button.js
// │       └── Modal.js


// The Index.js Pattern (Barrel Files)
// Use index.js to re-export from multiple files:
// utils/format.js
// export function formatDate(date) { /* ... */ }
// export function formatCurrency(amount) { /* ... */ }

// utils/validate.js
// export function isEmail(str) { /* ... */ }
// export function isPhone(str) { /* ... */ }

// utils/index.js — re-exports everything
// export { formatDate, formatCurrency } from './format.js';
// export { isEmail, isPhone } from './validate.js';

// Now in main.js, you can import from the folder
// import { formatDate, isEmail } from './utils/index.js';
// Or even shorter (works with bundlers and Node.js, not native browser modules):
// import { formatDate, isEmail } from './utils';


// Real Example: A Simple App

// config.js
// export const API_URL = 'https://api.example.com';
// export const APP_NAME = 'My App';

// services/api.js
// import { API_URL } from '../config.js';

// export async function fetchUsers() {
//   const response = await fetch(`${API_URL}/users`);
//   return response.json();
// }

// export async function fetchPosts() {
//   const response = await fetch(`${API_URL}/posts`);
//   return response.json();
// }

// services/auth.js
// import { API_URL } from '../config.js';

// let currentUser = null;  // Private to this module

// export async function login(email, password) {
//   const response = await fetch(`${API_URL}/login`, {
//     method: 'POST',
//     body: JSON.stringify({ email, password })
//   });
//   currentUser = await response.json();
//   return currentUser;
// }

// export function getCurrentUser() {
//   return currentUser;
// }

// export function logout() {
//   currentUser = null;
// }

// main.js — Entry point
// import { APP_NAME } from './config.js';
// import { fetchUsers } from './services/api.js';
// import { login, getCurrentUser } from './services/auth.js';

// console.log(`Welcome to ${APP_NAME}`);

// async function init() {
//   await login('user@example.com', 'password');
//   console.log('Logged in as:', getCurrentUser().name);
  
//   const users = await fetchUsers();
//   console.log('Users:', users);
// }

// init();


// Dynamic Imports
// Sometimes you don’t want to load a module until it’s needed. Dynamic imports
//  load modules on demand:

// Static import — always loaded
// import { bigFunction } from './heavy-module.js';

// Dynamic import — loaded only when needed
// async function loadWhenNeeded() {
//   const module = await import('./heavy-module.js');
//   module.bigFunction();
// }

// Common use: Code splitting for routes
// async function loadPage(pageName) {
//   switch (pageName) {
//     case 'home':
//       const home = await import('./pages/Home.js');
//       return home.default;
//     case 'about':
//       const about = await import('./pages/About.js');
//       return about.default;
//     case 'contact':
//       const contact = await import('./pages/Contact.js');
//       return contact.default;
//   }
// }

// Common use: Conditional loading (inside an async function)
// async function showCharts() {
//   if (userWantsCharts) {
//     const { renderChart } = await import('./chart-library.js');
//     renderChart(data);
//   }
// }

// The Evolution: From IIFEs to Modules
// Here’s how the same code would look in each era:
// Era 1: Global (Bad)
// Everything pollutes global scope
var counter = 0;

function increment() {
  counter++;
}

function getCount() {
  return counter;
}

// Problem: Anyone can do this
counter = 999;  // Oops, state corrupted!

// Era 2: IIFE (Better)
// Uses closure to hide counter
var Counter = (function() {
  var counter = 0;  // Private!
  
  return {
    increment: function() {
      counter++;
    },
    getCount: function() {
      return counter;
    }
  };
})();

Counter.increment();
console.log(Counter.getCount());  // 1
console.log(Counter.counter);     // undefined (private!)

// Era 3: ES6 Modules (Best)
// counter.js
let counter = 0;  // Private (not exported)

export function increment() {
  counter++;
}

export function getCount() {
  return counter;
}

// main.js
// import { increment, getCount } from './counter.js';

increment();
console.log(getCount());  // 1
// counter variable is not accessible at all

// Common Patterns and Best Practices
​
// 1. One Thing Per Module Each module should do one thing well:
// ✗ Bad: One file does everything
// utils.js with 50 different functions

// ✓ Good: Separate concerns
// formatters.js — formatting functions
// validators.js — validation functions
// api.js — API calls

// 2. Keep Related Things Together
// user/
// ├── User.js         # User class
// ├── userService.js  # User API calls
// ├── userUtils.js    # User-related utilities
// └── index.js        # Re-exports public API

// 3. Avoid Circular Dependencies
// ✗ Bad: A imports B, B imports A
// a.js
// import { fromB } from './b.js';
// export const fromA = "A";

// b.js
// import { fromA } from './a.js';  // Circular!
// export const fromB = "B";

// ✓ Good: Create a third module for shared code
// shared.js
// export const sharedThing = "shared";

// a.js
// import { sharedThing } from './shared.js';

// b.js
// import { sharedThing } from './shared.js';

// 4. Consider Default Exports for Components/Classes
// A common convention is to use default exports when a module has one main purpose:
// Components are usually one-per-file
// Button.js
// export default function Button({ label, onClick }) {
//   return <button onClick={onClick}>{label}</button>;
// }

// Usage is clean
// import Button from './Button.js';

// 5. Use Named Exports for Utilities
// Multiple utilities in one file
// stringUtils.js
// export function capitalize(str) { /* ... */ }
// export function truncate(str, length) { /* ... */ }
// export function slugify(str) { /* ... */ }

// Import only what you need
// import { capitalize } from './stringUtils.js';