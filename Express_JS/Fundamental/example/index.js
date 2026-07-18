// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, Geeks!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is listening at http://localhost:${PORT}`);
// });
// Basic Routing in Express.js
import express from 'express';
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Routing Examples

// Handle GET requests
app.get('/get-example', (req, res) => {
  res.send('This is a GET request');
});

// Handle POST requests
app.post('/post-example', (req, res) => {
  res.send('This is a POST request');
});

// Handle PUT requests
app.put('/put-example', (req, res) => {
  res.send('This is a PUT request');
});

// Handle DELETE requests
app.delete('/delete-example', (req, res) => {
  res.send('This is a DELETE request');
});

// Handle all HTTP methods
app.all('/all-example', (req, res) => {
  res.send(`This handles all HTTP methods: ${req.method}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// The first line of our code is using the import to include the express module. 
// This is how we include and use a package installed from npm in any JavaScript file in our 
// project. Before we start using Express, we need to define an instance of it which handles 
// the request and response from the server to the client. In our case, it is the variable app.

// app.get() is a function that tells the server what to do when a get request at the given 
// route is called. It has a callback function (req, res) that listen to the incoming request
//  req object and respond accordingly using res response object. Both req and res are made 
//  available to us by the Express framework.

// The req object represents the HTTP request and has properties for the request query string, 
// parameters, body, and HTTP headers. The res object represents the HTTP response that an 
// Express app sends when it gets an HTTP request. In our case, we are sending a text Hello
//  World whenever a request is made to the route /.

// Lastly, app.listen() is the function that starts a port and host, in our case the localhost 
// for the connections to listen to incoming requests from a client. We can define the port 
// number such as 3000.