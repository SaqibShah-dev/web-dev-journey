// What is the Event Loop?
// At its core, the JavaScript event loop is responsible for managing the execution 
// of code, collecting and processing events, and executing queued tasks. JavaScript
//  operates in a single-threaded environment, meaning only one piece of code runs at a 
//  time. The event loop ensures that tasks are executed in the correct order, enabling 
//  asynchronous programming.

// To explain it in simple terms, imagine you’re running a to-do list. The event loop is 
// like a manager that ensures tasks are completed in the right order, depending on their
//  type and urgency.

// Components of the Event Loop
// Call Stack: Keeps track of function calls. When a function is invoked, it is pushed 
//         onto the stack. When the function finishes execution, it is popped off.
// Web APIs: Provides browser features like setTimeout, DOM events, and HTTP requests. These
//         APIs handle asynchronous operations.
// Task Queue (Callback Queue): Stores tasks waiting to be executed after the call stack is 
//         empty. These tasks are queued by setTimeout, setInterval, or other APIs.
// Microtask Queue: A higher-priority queue for promises and MutationObserver callbacks. 
//         Microtasks are executed before tasks in the task queue.
// Event Loop: Continuously checks if the call stack is empty and pushes tasks from the 
//         microtask queue or task queue to the call stack for execution.


// How It Works (Simplified with an analogy):
// 1)Your Main Task: JavaScript executes code line by line in a single thread (like following a recipe). This is called the call stack.
// 2)Waiting Tasks (Events): Some tasks take time (e.g., fetching data from the internet, timers). Instead of blocking progress, these tasks are sent to “wait in line” in a queue (known as the event queue).
// 3_The Manager (Event Loop): The event loop constantly checks:
// 4)Is the main task (call stack) empty?
// 5)Are there any tasks waiting in the queue?
// 6)If yes, it picks a task from the queue and moves it to the stack for execution.

// Event Loop Analogy
// Imagine you’re at a restaurant:

// The Chef (Call Stack): The chef prepares one order at a time. If a dish takes a long time 
// to cook, the chef moves it to a separate station (like the oven or timer) and starts   
// working on the next order.
// The Waiter (Event Queue): The waiter keeps an eye on all pending tasks (like dishes 
//     in the oven) and brings them back to the chef once they’re ready.
// The Manager (Event Loop): The manager ensures the chef only works on one task at a 
// time and keeps the workflow smooth.


// Types of Tasks in JavaScript
// Synchronous Tasks: Executed immediately on the call stack (e.g., function calls, variable
//      declarations).
// Microtasks: High-priority asynchronous tasks, such as Promise callbacks and 
//      queueMicrotask.
// Macrotasks: Lower-priority asynchronous tasks, like setTimeout, setInterval, 
//      and DOM events.


// Example 1: Basic Synchronous and Asynchronous Code

console.log('A'); // Synchronous

setTimeout(() => {
  console.log('B'); // Macrotask
}, 0);

console.log('C'); // Synchronous
// Output: A, C, B

// Example 2: Microtasks with Promises

console.log('A');

setTimeout(() => {
  console.log('B is macrotask'); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('C is microtask in promise'); // Microtask
});

console.log('D');
// Output: A, D, C, B

// Example 3: Nested Microtasks

Promise.resolve().then(() => {
  console.log('A in nested microtask');
  Promise.resolve().then(() => console.log('B in nested microtask'));
});

console.log('C exp3');
// Output: C, A, B


// Example 4: setTimeout vs setImmediate (Node.js only)

setTimeout(() => console.log('A is macrotask'), 0); // Macrotask
// setImmediate(() => console.log('B is macrotask')); // Macrotask in Node.js
// Output (depends on Node js version): Generally A, then B


// Example 5: Event Listener and Promises

document.body.addEventListener('click', () => {
  console.log('Click Event'); // Macrotask
});

Promise.resolve().then(() => console.log('Promise Resolved')); // Microtask
console.log('End');
// Output: End, Promise Resolved, Click Event



// Example 6: Interleaving Promises and setTimeout

setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
setTimeout(() => console.log('C'), 0);
Promise.resolve().then(() => console.log('D'));
// Output: B, D, A, C


// Example 7: Nested Promises with setTimeout

console.log('A');

setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => {
    console.log('C');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('D');
  setTimeout(() => {
    console.log('E');
  }, 0);
});

console.log('F');


// Output:

// A (Synchronous)
// F (Synchronous)
// D (Microtask from Promise)
// B (Macrotask from setTimeout)
// C (Microtask created within the setTimeout)
// E (Macrotask from the inner setTimeout)


// Example 8: Promise Chaining with setTimeout

console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  }).then(() => {
    console.log('4');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('5');
}).then(() => {
  console.log('6');
});

console.log('7');

// Output:

// 1 (Synchronous)
// 7 (Synchronous)
// 5 (Microtask from first Promise)
// 6 (Chained Microtask)
// 2 (Macrotask from setTimeout)
// 3 (Microtask from Promise inside setTimeout)
// 4 (Chained Microtask)


// Example 9: Mixing Promise Resolution with Delays

console.log('Start Mixing Promise Resolution with Delays');

setTimeout(() => {
  console.log('Timeout 1 Mixing Promise Resolution with Delays');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1 Mixing Promise Resolution with Delays');
  setTimeout(() => {
    console.log('Timeout 2 Mixing Promise Resolution with Delays' );
  }, 0);
  return Promise.resolve();
}).then(() => {
  console.log('Promise 2 Mixing Promise Resolution with Delays');
});

console.log('End Mixing Promise Resolution with Delays');

// Output:

// Start (Synchronous)
// End (Synchronous)
// Promise 1 (Microtask)
// Promise 2 (Chained Microtask)
// Timeout 1 (Macrotask from first setTimeout)
// Timeout 2 (Macrotask from setTimeout inside Promise)


// Example 10: Deeply Nested Promises in a Timer

setTimeout(() => {
  console.log('Timer 1');
  Promise.resolve().then(() => {
    console.log('Microtask 1');
    Promise.resolve().then(() => {
      console.log('Microtask 2');
    });
  });
}, 0);

Promise.resolve().then(() => {
  console.log('Microtask 3');
});

console.log('Main Task');

// Output:

// Main Task (Synchronous)
// Microtask 3 (Microtask from Promise)
// Timer 1 (Macrotask from setTimeout)
// Microtask 1 (Microtask within setTimeout)
// Microtask 2 (Chained Microtask from Microtask 1)


// Example 11: Combining Chained Promises and Timer Nesting
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => {
    console.log('Promise 1');
  }).then(() => {
    console.log('Promise 2');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 3');
  setTimeout(() => {
    console.log('Timeout 2');
  }, 0);
  return Promise.resolve();
}).then(() => {
  console.log('Promise 4');
});

console.log('End');

// Output:

// Start (Synchronous)
// End (Synchronous)
// Promise 3 (Microtask from first Promise)
// Promise 4 (Chained Microtask)
// Timeout 1 (Macrotask from first setTimeout)
// Promise 1 (Microtask within Timeout 1)
// Promise 2 (Chained Microtask within Timeout 1)
// Timeout 2 (Macrotask from setTimeout inside Promise)




// The JavaScript Runtime Environment
// To understand the Event Loop, you need to see the full picture:
// ┌─────────────────────────────────────────────────────────────────────────┐
// │                        JAVASCRIPT RUNTIME                               │
// │  ┌─────────────────────────────────────────────────────────────────┐   │
// │  │                      JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.) │   │
// │  │  ┌───────────────────────┐    ┌───────────────────────────┐     │   │
// │  │  │      CALL STACK       │    │          HEAP             │     │   │
// │  │  │                       │    │                           │     │   │
// │  │  │  ┌─────────────────┐  │    │   { objects stored here } │     │   │
// │  │  │  │ processData()   │  │    │   [ arrays stored here ]  │     │   │
// │  │  │  ├─────────────────┤  │    │   function references     │     │   │
// │  │  │  │ fetchUser()     │  │    │                           │     │   │
// │  │  │  ├─────────────────┤  │    │                           │     │   │
// │  │  │  │ main()          │  │    │                           │     │   │
// │  │  │  └─────────────────┘  │    └───────────────────────────┘     │   │
// │  │  └───────────────────────┘                                      │   │
// │  └─────────────────────────────────────────────────────────────────┘   │
// │                                                                         │
// │  ┌─────────────────────────────────────────────────────────────────┐   │
// │  │                    BROWSER / NODE.js APIs                        │   │
// │  │                                                                  │   │
// │  │   setTimeout()    setInterval()    fetch()    DOM events         │   │
// │  │   requestAnimationFrame()    IndexedDB    WebSockets             │   │
// │  │                                                                  │   │
// │  │   (These are handled outside of JavaScript execution!)           │   │
// │  └─────────────────────────────────────────────────────────────────┘   │
// │                                    │                                    │
// │                                    │ callbacks                          │
// │                                    ▼                                    │
// │  ┌──────────────────────────────────────────────────────────────────┐  │
// │  │  MICROTASK QUEUE                    TASK QUEUE (Macrotask)       │  │
// │  │  ┌────────────────────────┐        ┌─────────────────────────┐   │  │
// │  │  │ Promise.then()         │        │ setTimeout callback     │   │  │
// │  │  │ queueMicrotask()       │        │ setInterval callback    │   │  │
// │  │  │ MutationObserver       │        │ I/O callbacks           │   │  │
// │  │  │ async/await (after)    │        │ UI event handlers       │   │  │
// │  │  └────────────────────────┘        │ Event handlers          │   │  │
// │  │         ▲                          └─────────────────────────┘   │  │
// │  │         │ HIGHER PRIORITY                    ▲                   │  │
// │  └─────────┼────────────────────────────────────┼───────────────────┘  │
// │            │                                    │                       │
// │            └──────────┬─────────────────────────┘                       │
// │                       │                                                 │
// │              ┌────────┴────────┐                                        │
// │              │   EVENT LOOP    │                                        │
// │              │                 │                                        │
// │              │  "Is the call   │                                        │
// │              │   stack empty?" ├──────────► Push next callback          │
// │              │                 │            to call stack               │
// │              └─────────────────┘                                        │
// └─────────────────────────────────────────────────────────────────────────┘