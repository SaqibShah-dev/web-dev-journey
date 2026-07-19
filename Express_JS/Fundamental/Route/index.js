// Routing Methods
// HTTP is a standard protocol for a client and a server to communicate over. It provides
//  different methods for a client to make request. Each route has at least on hanlder 
//  function or a callback. This callback function determines what will be the response 
//  from server for that particular route. For example, a route of app.get() is used to 
//  handle GET requests and in return send simple message as a response.

// // GET method route
// app.get('/', (req, res) => res.send('Hello World!'));


// Routing Paths
// A routing path is a combination of a request method to define the endpoints at which 
// requests can be made by a client. Route paths can be strings, string patterns, or regular
//  expressions.

// Let us define two more endpoints in our server based application.

// app.get('/home', (req, res) => {
//   res.send('Home Page');
// });
// app.get('/about', (req, res) => {
//   res.send('About');
// });

// Consider the above code as a bare minimum website which has two endpoints, /home and /about. 
// If a client makes a request for home page, it will only response with Home Page and 
// on /about it will send the response: About Page. We are using the res.send function to
//  send the string back to the client if any one of the two routes defined is selected.

// Types of Parameters in Express:
//1) Routing Parameters
// Route parameters are named URL segments that are used to capture the values specified at 
// their position in the URL. req.params object is used in this case because it has access to 
// all the parameters passed in the url.

// app.get('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ID is ${userId}`);
// });
// app.get('/books/:bookId', (req, res) => {
//   res.send(req.params);
// });
// The request URL from client in above source code will be http://localhost:3000/books/23. The 
// name of route parameters must be made up of characters ([A-Za-z0-9_]). A very general use
//  case of a routing parameter in our application is to have 404 route.

// 2) Query Parameters: Appended to the URL (e.g., /search?term=nodejs) accessed via req.query.


// app.get('/search', (req, res) => {
//   const searchTerm = req.query.term;
//   res.send(`Searching for ${searchTerm}`);
// });

// 3. Request Body Parameters: Sent in POST or PUT requests, accessed via req.body with
//  express.json() middleware.


// app.use(express.json());

// app.post('/users', (req, res) => {
//   const { name, age } = req.body;
//   res.send(`User created: ${name}, Age: ${age}`);
// });


