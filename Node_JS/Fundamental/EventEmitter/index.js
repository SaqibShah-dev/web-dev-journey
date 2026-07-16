// Creating an EventEmitter
// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Register an event listener
// myEmitter.on('event', () => {
//   console.log('An event occurred!');
// });

// // Emit the event
// myEmitter.emit('event');

// Passing Arguments to Listeners
// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Event with multiple arguments
// myEmitter.on('status', (code, message) => {
//   console.log(`Got status: ${code} ${message}`);
// });

// // Emit with arguments
// myEmitter.emit('status', 200, 'OK');

// One-time Event Listeners

// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Add one-time listener
// myEmitter.once('onetime', () => {
//   console.log('This will be called only once');
// });

// // First emit - will trigger the listener
// myEmitter.emit('onetime');

// // Second emit - won't trigger the listener
// myEmitter.emit('onetime');

// Error Events

// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Error event handler
// myEmitter.on('error', (err) => {
//   console.error('Error occurred:', err.message);
// });

// // Emit an error event
// myEmitter.emit('error', new Error('Something went wrong'));

// If no 'error' listener is added, Node will throw and crash
// Always add an error handler!


// Getting Event Names and Listeners

// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Add some listeners
// myEmitter.on('event1', () => console.log('Event 1'));
// myEmitter.on('event2', () => console.log('Event 2'));
// myEmitter.on('event2', () => console.log('Event 2 again'));

// myEmitter.emit("event1");
// myEmitter.emit("event2");
// // Get all event names
// console.log('Event names:', myEmitter.eventNames());

// // Get listeners for a specific event
// console.log('Listeners for event2:', myEmitter.listeners('event2'));

// // Count listeners
// console.log('Listener count for event2:', myEmitter.listenerCount('event2'));


// Removing Listeners

// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Define listener function (needed for removal)
// function listener1() {
//   console.log('Listener 1 executed');
// }

// function listener2() {
//   console.log('Listener 2 executed');
// }


// // Add listeners
// myEmitter.on('event', listener1);
// myEmitter.on('event', listener2);

// console.log('Listeners before removal:', myEmitter.listenerCount('event'));

// // Remove a specific listener
// myEmitter.removeListener('event', listener1);
// // or using the alias: myEmitter.off('event', listener1);

// console.log('Listeners after removal:', myEmitter.listenerCount('event'));

// // Remove all listeners for an event
// myEmitter.removeAllListeners('event');

// console.log('Listeners after removeAll:', myEmitter.listenerCount('event'));


// Setting Maximum Listeners

// import {EventEmitter} from "node:events";

// // Set the default max listeners for all EventEmitter instances
// EventEmitter.defaultMaxListeners = 15;

// const myEmitter = new EventEmitter();

// // Set max listeners for a specific instance
// myEmitter.setMaxListeners(20);

// console.log('Default max listeners:', EventEmitter.defaultMaxListeners);
// console.log('myEmitter max listeners:', myEmitter.getMaxListeners());

// Adding more than maxListeners will trigger a warning
// The warning helps identify potential memory leaks


// Order of Listeners


// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Default behavior: listeners execute in order they were added
// myEmitter.on('event', () => console.log('First listener'));
// myEmitter.on('event', () => console.log('Second listener'));

// // Prepend a listener (it will execute first)
// myEmitter.prependListener('event', () => console.log('Prepended listener'));

// // One-time prepended listener
// myEmitter.prependOnceListener('event', () => console.log('Prepended once listener'));


// // Emit the event
// myEmitter.emit('event');

// Output will be:
// Prepended once listener
// Prepended listener
// First listener
// Second listener



// Extending EventEmitter

// import {EventEmitter} from "node:events";

// // Custom class that extends EventEmitter
// class MyApp extends EventEmitter {
//   constructor() {
//     super();
//     this.name = 'MyApp';
//   }

//   process(data) {
//     // Do some processing
//     console.log(`Processing data: ${data}`);
    
//     // Emit events based on processing results
//     if (data.length > 10) {
//       this.emit('large-data', data);
//     } else {
//       this.emit('small-data', data);
//     }
    
//     // Emit completion event
//     this.emit('processed', data);
//   }
// }

// // Create an instance
// const app = new MyApp();

// // Register event listeners
// app.on('large-data', (data) => {
//   console.log(`Large data detected: ${data.length} bytes`);
// });

// app.on('small-data', (data) => {
//   console.log(`Small data detected: ${data.length} bytes`);
// });

// app.on('processed', (data) => {
//   console.log('Processing completed');
// });

// // Use the app
// app.process('Hello');
// app.process('Hello, this is a longer string of data');



// Asynchronous vs. Synchronous
// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Register listener
// myEmitter.on('event', () => {
//   console.log('Listener executed');
// });

// // Emit event
// console.log('Before emit');
// myEmitter.emit('event');
// console.log('After emit');

// Output:
// Before emit
// Listener executed
// After emit


// import {EventEmitter} from "node:events";
// const myEmitter = new EventEmitter();

// // Register async listener using setImmediate
// myEmitter.on('async-event', () => {
//   setImmediate(() => {
//     console.log('Async listener executed');
//   });
// });

// console.log('Before emit');
// myEmitter.emit('async-event');
// console.log('After emit');

// Output:
// Before emit
// After emit
// Async listener executed


// Promise Integration
// import {EventEmitter} from "node:events";

// // Enable capture rejections (Node.js 12.16.0+)
// const myEmitter = new EventEmitter({ captureRejections: true });

// // OR set it globally
// // EventEmitter.captureRejections = true;

// // Event handler that returns a Promise
// myEmitter.on('async-operation', async () => {
//   // This rejected promise will be captured and converted to an 'error' event
//   throw new Error('Async operation failed');
// });

// // Error handler
// myEmitter.on('error', (err) => {
//   console.error('Caught error:', err.message);
// });

// // Trigger the event
// myEmitter.emit('async-operation');


// Real-World Example: HTTP Server
import http from "node:http";

// HTTP Server is an EventEmitter
const server = http.createServer();

// Listen for 'request' events
server.on('request', (request, response) => {
  console.log(`Received ${request.method} request for ${request.url}`);
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World\n');
});

// Listen for 'connection' events
server.on('connection', (socket) => {
  console.log('New client connection from', socket.remoteAddress);
});

// Listen for 'close' event
server.on('close', () => {
  console.log('Server closed');
});

// Listen on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});

// Later, we can close the server
// server.close();