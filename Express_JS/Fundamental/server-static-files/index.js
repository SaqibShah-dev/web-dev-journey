
// Serving Static Files
// To serve static files such as CSS stylesheets, images, etc. Express provides a built in 
// middleware function express.static. Static files are those files that a client downloads 
// from a server.

// It is the only middleware function that comes with Express framework and we can use it 
// directly in our application. All other middlewares are third party.

// By default, Express does not allow to serve static files. We have to use this middleware 
// function. A common practice in the development of a web application is to store all static
//  files under the ‘public’ directory in the root of a project. We can serve this folder to 
//  serve static files include by writing in our index.js file:

// app.use(express.static('public'));
// Now, the static files in our public directory will be loaded.

// http://localhost:3000/css/style.css
// http://localhost:3000/images/logo.png
// http://localhost:3000/images/bg.png
// http://localhost:3000/index.html

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Hello Geek');
});
app.listen(PORT, () => {
    console.log(`Server Established at PORT -> ${PORT}`);
});