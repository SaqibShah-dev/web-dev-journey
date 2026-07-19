// Middleware in Express
// Middleware in Express.js are functions that run during the request–response lifecycle to 
// process requests, modify responses, and control application flow.

// Executes custom logic for each request.
// Can read or modify req and res.
// May send a response and end the cycle.
// Uses next() to pass control to the next middleware


// Syntax:

// app.use((req, res, next) => {
//     console.log('Middleware executed');
//     next();
// });
// (req, res, next) => {}: Middleware function to process the request and response before the 
// final handler.
// next(): Passes control to the next middleware if the request–response cycle isn’t ended.
// Working of Middleware in Express.js
// In Express.js, middleware functions are executed sequentially in the order they are added to 
// the application.

// Request arrives at the server.
// Middleware functions are applied to the request, one by one.
// Each middleware either sends a response or passes control using next().
// If no middleware ends the cycle, the route handler is reached, and a final response is sent.
// Types of Middleware
// ExpressJS offers different types of middleware and you should choose the middleware based on 
// functionality required.

// 1. Application-level Middleware
// Application-level middleware runs across the entire Express application, handling common
//  logic for all incoming requests.

// Registered using app.use() or app.METHOD().
// Executes for all routes and HTTP methods.
// Commonly used for logging, authentication, body parsing, and headers.

// app.use(express.json()); // Parses JSON data for every incoming request
// app.use((req, res, next) => {
//   console.log('Request received:', req.method, req.url);
//   next();
// });
// 2. Router-level Middleware
// Router-level middleware applies to a specific router instance, allowing middleware logic to
//  be scoped to a defined group of routes.

// Registered using router.use() or router.METHOD().
// Executes only for routes within that router.
// Ideal for modular route grouping (e.g., auth or user routes).
// Improves code organization and maintainability by isolating middleware to related routes.

// const router = express.Router();

// // Apply middleware to only this router's routes
// router.use((req, res, next) => {
//   console.log('Router-specific middleware');
//   next();
// });

// router.get('/dashboard', (req, res) => {
//   res.send('Dashboard Page');
// });

// app.use('/user', router); // The middleware applies only to routes under "/user"
// 3. Error-handling Middleware
// Error-handling middleware captures and processes runtime errors during the request–response 
// cycle to ensure stable application behavior.

// Defined with four parameters: err, req, res, next.
// Sends consistent error responses and prevents server crashes.

// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log the error stack
//   res.status(500).send('Something went wrong!');
// });
// 4. Built-in Middleware
// Express offers built-in middleware functions to handle common server tasks efficiently.

// express.static() serves static files like images, CSS, and JS.
// express.json() parses incoming JSON request bodies.

// app.use(express.static('public')); // Serves static files from the "public" folder
// app.use(express.json()); // Parses JSON payloads in incoming requests
// 5. Third-party Middleware
// Third-party middleware extends Express applications with additional functionality through 
// npm packages.

// Developed by external contributors and installed via npm.
// Adds features like logging, security, and validation.
// Examples include morgan for request logging and body-parser for parsing request bodies.

// const morgan = require('morgan');
// app.use(morgan('dev')); // Logs HTTP requests using the "dev" format

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
// Implement Middleware in Express
// Below are the steps to implement middleware:

// Step 1: Initialize the Node.js Project
// npm init -y
// Step 2: Install the required dependencies
// npm install express

// app.use((req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });
// The above middleware function is called for every request made by the client. When running 
// the server you will notice, for the every browser request on the endpoint /, you will be
//  prompt with a message in your terminal:

// A new request received at 1467267512545
// Middleware functions can be used for a specific route. See the example below:

// const express = require('express');
// const app = express();

// //Simple request time logger for a specific route
// app.use('/home', (req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });

// app.get('/home', (req, res) => {
//   res.send('Home Page');
// });

// app.get('/about', (req, res) => {
//   res.send('About Page');
// });

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
// This time, you will only see a similar prompt when the client request the endpoint /home
//  since the route is mentioned in app.use(). Nothing will be shown in the terminal when the
//   client requests endpoint /about.

// Order of middleware functions is important since they define when to call which middleware 
// function. In our above example, if we define the route app.get('/home')... before the 
// middleware app.use('/home')..., the middleware function will not be invoked.

// bodyParser
// It allows developers to process incoming data, such as body payload. The payload is just the 
// data we are receiving from the client to be processed on. Most useful with POST methods. It 
// is installed using:

// npm install --save body-parser
// Usage:

// const bodyParser = require('body-parser');

// // To parse URL encoded data
// app.use(bodyParser.urlencoded({ extended: false }));

// // To parse json data
// app.use(bodyParser.json());
// It is probably one of the most used third-party middleware function in any Express 
// applicaiton.

// cookieParser
// It parses Cookie header and populate req.cookies with an object keyed by cookie names. To 
// install it,

// $ npm install --save cookie-parser
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
// session
// This middleware function creates a session middleware with given options. A session is often 
// used in applications such as login/signup.

// $ npm install --save session
// app.use(
//   session({
//     secret: 'arbitary-string',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   })
// );
// morgan
// The morgan middleware keeps track of all the requests and other important information 
// depending on the output format specified.

// npm install --save morgan
// const logger = require('morgan');
// // ... Configurations
// app.use(logger('common'));
// common is a predefined format case which you can use in the application. There are other
//  predefined formats such as tiny and dev, but you can define you own custom format too 
//  using the string parameters that are available to us by morgan.