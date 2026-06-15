# ☕ Phases 11-12: JavaScript Core Logic & Interactivity

Welcome to the **JavaScript (JS)** learning track! JavaScript is the programming language that breathes life into static HTML structures, allowing you to run calculations, handle events, modify styles on-the-fly, and fetch data from databases or remote APIs.

This directory contains clean, detailed script guides and runner containers designed to teach you JavaScript from foundational variables up to asynchronous API integrations.

---

## 🚀 How to Run the Javascript Lab Files

Because most of these files are node-executable or output logs directly, there are two simple ways to run and inspect them:

### 1️⃣ Recommended: Open in Browser DevTools
Every JS subdirectory (e.g., `/JS/functions`) contains a runner **`index.html`** file that imports the corresponding `.js` script via `<script src="..."></script>`.
1. Open the folder in VS Code.
2. Right-click the **`index.html`** file in your target JS subdirectory and choose **"Open with Live Server"**.
3. Once the page loads, press **`F12`** (or right-click → **"Inspect"**) and go to the **Console** tab.
4. View the color-coded, labeled logs corresponding to the code annotations!

### 2️⃣ Command Line: Run with Node.js
If you have [Node.js](https://nodejs.org/) installed locally:
1. Open your terminal in the target JS folder.
2. Run the script directly:
   ```bash
   node function.js
   ```

---

## 📂 JavaScript Curriculum Walkthrough

Explore each topic in sequence to build a solid foundation:

### 🧪 1. Variables & Types (`/JS/variable-and-types`)
Core structures of code storage and assignments.
* 📦 **[variable-and-types.js](./variable-and-types/variable-and-types.js)**
  - **Scope Controls:** `let` vs `const` scoping behaviors.
  - **Memory Allocations:** Primitive types (stored by value on stack) vs Reference types (objects/arrays stored on heap).
  - **Coercion & Equality:** Conversions and comparison behaviors (`==` vs strict `===`).
  - **Operators:** Testing data types using `typeof`.

### ⚙️ 2. Functions & Context Bindings (`/JS/functions`)
Reusable machines and scoping rules.
* ⚙️ **[function.js](./functions/function.js)**
  - **Syntax Styles:** Function Declarations vs expressions vs arrow definitions.
  - **Variable Scope & Hoisting:** Declaring variables, hoisting mechanisms, and the Temporal Dead Zone (TDZ).
  - **Context Rules:** Lock context references using `call()`, `apply()`, and `bind()`.
  - **Closures:** Encapsulating private variables within parent scopes.
  - **HOFs & IIFEs:** High-order helpers and immediate invocation patterns.

### 📊 3. Array Processing (`/JS/arrays`)
Iterables, sorting, mapping, and modern destructurings.
* 📊 **[arrays.js](./arrays/arrays.js)**
  - **Transformations:** Iterating using `forEach()`, mapping with `map()`, filtering arrays with `filter()`, searching elements via `find()`, and reducing items with `reduce()`.
  - **Modifiers:** Mutating sorting functions (`sort()`), inserting values (`push`/`unshift`), and splicing.
  - **Modern Syntax:** Array destructurings, rest parameters, and cloning using spread (`...`).

### 💎 4. Objects & Context Scopes (`/JS/Objects`)
Key-value records, parameters, and nested scopes.
* 💎 **[objects.js](./Objects/objects.js)**
  - **Data Access:** Dot vs bracket (`[]`) lookups, property tests (`in`, `hasOwnProperty`), and deleting attributes.
  - **Destructuring:** Unpacking values, renaming, default variables, and object spreads.
  - **Static Helpers:** Processing records into loops using `Object.keys()`, `values()`, and `entries()`.
  - **Access Guard:** Optional chaining (`?.`) for safe nested data navigation.
  - **Scope Bindings:** Regular object method definitions vs arrow methods, and resolving callback scope breaks.

### 🖥️ 5. DOM Manipulation (`/JS/DOM-Manipulation`)
Handling user clicks, mutating text, and styling nodes.
* 🖱️ **[dom-manipulation.js](./DOM-Manipulation/dom-manipulation.js)**
  - Selectors: `querySelector`, `querySelectorAll`, `getElementById`.
  - Listeners: Binding event listeners (clicks, inputs).
  - Mutators: Injecting `innerHTML`/`textContent`, editing style attributes, and toggling classes.
* 🏆 **[exercise.html](./DOM-Manipulation/exercise.html) & [exercise.js](./DOM-Manipulation/exercise.js)**
  - Practical training challenges verifying event listening, color updates, and input controls.

### ⏳ 6. Asynchronous Programming (`/JS/AsyncJS`)
Timeouts, execution queues, and remote data fetching.
* ⏳ **[Async.js](./AsyncJS/Async.js)**
  - **Event Loop Flow:** Sync operations vs async queues.
  - **Callbacks:** Timeouts (`setTimeout`) and asynchronous callbacks.
  - **Promises:** Creating pending promises and chaining operations with `.then()`, `.catch()`, and `.finally()`.
  - **Async/Await:** Sequential reading of async operations, error wrappers using `try-catch`.
  - **API Integration:** Fetching external JSON resources (`fetch()`).
* 🏆 **[exercise.html](./AsyncJS/exercise.html) & [exerciseTask.js](./AsyncJS/exerciseTask.js)**
  - Exercises checking delayed action chains and response logging.

---

## 🧠 Core JS Self-Assessment

Before finishing this track, verify you understand these core concepts:

- [ ] What is the difference between passing by value and passing by reference?
- [ ] Why does calling an arrow function as an object method make `this` undefined or point to the window object?
- [ ] How does `bind()` differ from `call()` and `apply()`?
- [ ] What is the Temporal Dead Zone (TDZ) in ES6 JavaScript?
- [ ] When would you use `.map()` over `.forEach()` on an array?
- [ ] What is the difference between a Callback, a Promise, and Async/Await?
- [ ] How does the JavaScript Event Loop handle synchronous vs asynchronous executions?
