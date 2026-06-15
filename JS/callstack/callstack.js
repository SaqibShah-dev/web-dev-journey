// How does JavaScript keep track of which function is running? When a function calls 
// another function, how does JavaScript know where to return when that function finishes?
// The answer is the call stack. It’s JavaScript’s mechanism for tracking function 
// execution

function greet(name) {
  const message = createMessage(name)
  console.log(message)
}

function createMessage(name) {
  return "Hello, " + name + "!"
}

greet("Alice")  // "Hello, Alice!"
// When greet calls createMessage, JavaScript remembers where it was in greet so it can
//  return there after createMessage finishes. The call stack is what makes this possible.


// The Stack of Plates: A Real-World Analogy
// Imagine you’re working in a restaurant kitchen, washing dishes. As clean plates come out,
//  you stack them one on top of another. When a server needs a plate, they always take the 
//  one from the top of the stack, not from the middle or bottom.
//         ┌───────────┐
//         │  Plate 3  │  ← You add here (top)
//         ├───────────┤
//         │  Plate 2  │
//         ├───────────┤
//         │  Plate 1  │  ← First plate (bottom)
//         └───────────┘
// This is exactly how JavaScript keeps track of your functions! When you call a function, 
// JavaScript puts it on top of a “stack.” When that function finishes, JavaScript removes 
// it from the top and goes back to whatever was underneath.
// This simple concept, adding to the top and removing from the top, is the foundation of '
// how JavaScript executes your code.

// What is the Call Stack?
// The call stack is a mechanism that JavaScript uses to keep track of where it is in your
//  code. Think of it as JavaScript’s “to-do list” for function calls, but one where it 
//  can only work on the item at the top.

function first() { second(); }
function second() { third(); }
function third() { console.log('Hello!'); }

first();
// Stack grows: [first] → [second, first] → [third, second, first]
// Stack shrinks: [second, first] → [first] → []


// The LIFO Principle
// The call stack follows a principle called LIFO: Last In, First Out.
// Last In: The most recent function call goes on top
// First Out: The function on top must finish before we can get to the ones below
// LIFO = Last In, First Out

// ┌─────────────────┐
// │   function C    │  ← Last in (most recent call)
// ├─────────────────┤     First to finish and leave
// │   function B    │
// ├─────────────────┤
// │   function A    │  ← First in (earliest call)
// └─────────────────┘     Last to finish


// Why Does JavaScript Need a Call Stack?
// JavaScript is single-threaded, meaning it can only do one thing at a time. According to 
// the ECMAScript specification, each function invocation creates a new execution context that
//  gets pushed onto the stack. The call stack helps JavaScript:
// Remember where it is — Which function is currently running?
// Know where to go back — When a function finishes, where should execution continue?
// Keep track of local variables — Each function has its own variables that shouldn’t 
// interfere with others

// How the Call Stack Works: Step-by-Step
// Let’s trace through a simple example to see the call stack in action.
// ​
// A Simple Example
function greet(name) {
  const greeting = createGreeting(name);
  console.log(greeting);
}

function createGreeting(name) {
  return "Hello, " + name + "!";
}

// Start here
greet("Alice");
console.log("Done!");

// Step	Action	Stack (top → bottom)	What’s Happening
// 1	Start	[]	Program begins
// 2	Call greet("Alice")	[greet]	Enter greet function
// 3	Call createGreeting("Alice")	[createGreeting, greet]	greet pauses, enter createGreeting
// 4	Return from createGreeting	[greet]	createGreeting done, back to greet
// 5	Return from greet	[]	greet done, continue program
// 6	console.log("Done!")	[]	Print “Done!”

// Execution Context: What’s Actually on the Stack?
// When we say a function is “on the stack,” what does that actually mean? Each entry on 
// the call stack is called an execution context, sometimes referred to as a stack frame 
// in general computer science terms. It contains everything JavaScript needs to execute 
// that function.

// Simple definition first
// When JavaScript runs a function, it needs to know:
// What variables exist in this function?
// What is this here?
// What outer scope can I access?
// All this information is bundled together into one package called an Execution Context 
// — think of it as a "function's workspace."

// The Restaurant Analogy
// ┌─────────────────────────────────┐
// │         ORDER TICKET            │
// │─────────────────────────────────│
// │ Function: makeBurger            │
// │ Ingredients: bun, patty, sauce  │ ← variables
// │ Table number: 5                 │ ← 'this'
// │ Previous order to return to: 3  │ ← outer scope
// └─────────────────────────────────┘

// Each "order ticket" = one Execution Context

// What's actually INSIDE an Execution Context?
// Every Execution Context has exactly 3 things:
// Execution Context
// ├── 1. Variable Environment  → all variables/functions declared here
// ├── 2. Scope Chain           → connection to outer scopes
// └── 3. this keyword          → what 'this' refers to here

// 1. Variable Environment
// Every variable and function declared inside that function lives here:

// function makeBurger() {
//     // All of these live in makeBurger's Variable Environment:
//     const bun = "sesame";
//     const patty = "beef";
//     let sauce = "ketchup";
    
//     function addCheese() { // even inner functions!
//         console.log("cheese added");
//     }
    
//     addCheese();
//     console.log(bun + " " + patty + " " + sauce);
// }
// makeBurger();

// Inside makeBurger's Execution Context:
// Variable Environment:
// ┌─────────────────────────┐
// │ bun       = "sesame"    │
// │ patty     = "beef"      │
// │ sauce     = "ketchup"   │
// │ addCheese = function(){} │
// └─────────────────────────┘
// These variables ONLY exist while makeBurger is running. Once it finishes — they're 
// gone! (Unless a closure captures them — which you already know!)

// 2. Scope Chain
// Each Execution Context has a reference to its outer scope — like a chain of 
// workspaces connected together.
// const restaurant = "Burger Place"; // Global

// function makeBurger() {
//     const size = "large"; // makeBurger's scope
    
//     function addSauce() {
//         const sauce = "ketchup"; // addSauce's scope
        
//         // Can access ALL of these:
//         console.log(sauce);      // ✅ own scope
//         console.log(size);       // ✅ outer scope (makeBurger)
//         console.log(restaurant); // ✅ global scope
//     }
    
//     addSauce();
// }

// makeBurger();

// Scope Chain visualization:
// addSauce's Context
// ┌─────────────────────────────────────────┐
// │ sauce = "ketchup"                       │
// │ outer scope → makeBurger's Context ──┐  │
// └──────────────────────────────────────│──┘
//                                        ↓
//                     makeBurger's Context
//                     ┌─────────────────────────────────────┐
//                     │ size = "large"                      │
//                     │ outer scope → Global Context ────┐  │
//                     └──────────────────────────────────│──┘
//                                                        ↓
//                                         Global Context
//                                         ┌──────────────────────┐
//                                         │ restaurant = "Burger" │
//                                         │ outer scope → null   │
//                                         └──────────────────────┘

// When addSauce looks for a variable, it searches:

// Own scope first → found? use it ✅
// Not found? → go up the chain to makeBurger → found? use it ✅
// Not found? → go up to Global → found? use it ✅
// Not found anywhere? → ❌ ReferenceError!

// This is why closures work — the scope chain keeps outer contexts accessible 
// even after they finish running!

// 3. this keyword
// Each Execution Context gets its own this value — which differs depending on HOW the 
// function was called:

// Global context — 'this' is window (browser)
console.log(this); // Window object

// Regular function — 'this' is who called it
const restaurant = {
    name: "Burger Place",
    
    // Method — 'this' is the object
    greet() {
        console.log(this.name); // "Burger Place" ✅
    },
    
    // Arrow function — NO own 'this', inherits from outer
    greetArrow: () => {
        console.log(this.name); // undefined ❌ (inherits global 'this')
    }
};

restaurant.greet();      // "Burger Place"
restaurant.greetArrow(); // undefined

// Watching the Call Stack in action
// Let's trace through a complete example step by step:
const name = "Alex"; // Global

function greet() {
    const greeting = "Hello";
    return sayHi(greeting);
}

function sayHi(g) {
    const message = g + " " + name;
    return message;
}

const result = greet();
console.log(result); // "Hello Alex"

// Step 1: Global Execution Context created
// CALL STACK:
// ┌──────────────────────────────────┐
// │         GLOBAL CONTEXT           │
// │ name    = "Alex"                 │
// │ greet   = function               │
// │ sayHi   = function               │
// │ result  = undefined (not yet)    │
// │ this    = window                 │
// └──────────────────────────────────┘

// Step 2: greet() is called — new context pushed ON TOP
// CALL STACK:
// ┌──────────────────────────────────┐
// │          greet() CONTEXT         │  ← currently running
// │ greeting = "Hello"               │
// │ this     = window                │
// │ scope chain → Global ↓           │
// └──────────────────────────────────┘
// ┌──────────────────────────────────┐
// │         GLOBAL CONTEXT           │  ← waiting
// │ name = "Alex"                    │
// └──────────────────────────────────┘

// Step 3: sayHi() is called inside greet() — another context pushed
// CALL STACK:
// ┌──────────────────────────────────┐
// │          sayHi() CONTEXT         │  ← currently running
// │ g       = "Hello"                │
// │ message = "Hello Alex"           │
// │ this    = window                 │
// │ scope chain → Global ↓           │
// └──────────────────────────────────┘
// ┌──────────────────────────────────┐
// │          greet() CONTEXT         │  ← waiting
// │ greeting = "Hello"               │
// └──────────────────────────────────┘
// ┌──────────────────────────────────┐
// │         GLOBAL CONTEXT           │  ← waiting
// │ name = "Alex"                    │
// └──────────────────────────────────┘

// Step 4: sayHi() returns — context POPPED OFF
// CALL STACK:
// ┌──────────────────────────────────┐
// │          greet() CONTEXT         │  ← back to running
// │ greeting = "Hello"               │
// │ return value = "Hello Alex"      │
// └──────────────────────────────────┘
// ┌──────────────────────────────────┐
// │         GLOBAL CONTEXT           │  ← waiting
// │ name = "Alex"                    │
// └──────────────────────────────────┘


// Step 5: greet() returns — context POPPED OFF
// CALL STACK:
// ┌──────────────────────────────────┐
// │         GLOBAL CONTEXT           │  ← back to running
// │ name   = "Alex"                  │
// │ result = "Hello Alex" ✅         │  ← now assigned!
// └──────────────────────────────────┘
// Step 6: All done — Global Context popped off
// CALL STACK:
// ┌──────────────────┐
// │   (empty) ✅     │
// └──────────────────┘