// The http module is Node's built-in tool for creating a web server — something that 
// listens for incoming requests (like when a browser visits a URL) and sends back 
// responses. 

// Create the Server

// import http from 'node:http';
// const server = http.createServer((request, response) => {
// });
// server.listen(8080);

// const server = http.createServer();
// server.on('request', (request, response) => {
//   // the same kind of magic happens here!
// });
// console.log(server)

// createServer is just a shortcut. Under the hood, the server is a Node.js EventEmitter. 
// Node triggers an event called 'request' every time a ping comes in. The request and 
// response objects passed into the function are your primary tools for the entire 
// transaction.

// Method, URL, & Headers
// When a request arrives, you need to know what the client wants and where they are trying to
//  go. You pull this metadata directly off the request object.

// method: The HTTP verb (like GET for fetching data, or POST for sending data).

// url: The path. If a user visits http://localhost:8080/profile?id=4, the url property is just /profile?id=4.

// headers: Extra metadata about the device, content types, and cookies. Node automatically 
// converts all header keys to lowercase to save you from guessing if the client sent
//  Content-Type or content-type.

// The request object is an instance of IncomingMessage.

// The method here will always be a normal HTTP method/verb. The url is the full URL without 
// the server, protocol or port. For a typical URL, this means everything after and including
//  the third forward slash.



// import http from 'node:http';
// const server = http.createServer((request, response) => {
//     const { method, url, headers } = request;
//     const userAgent = headers['user-agent'];
//     console.log(method,url);
// });
// server.listen(8080, () => {
//   console.log('🚀 Server is running and listening on http://localhost:8080');
// });
// The Request Body

// Getting data out of a POST or PUT request isn't as simple as reading a variable. Node.js
//  processes incoming data as a Stream.

// Think of a stream like water dripping out of a faucet into a bucket. The data arrives in 
// tiny pieces called chunks (Buffers). You have to catch the chunks and piece them 
// together.


// import http from 'node:http';
// const server = http.createServer((request, response) => {
//     const { method, url, headers } = request;
//     const userAgent = headers['user-agent'];
//     console.log(method,url,userAgent);
//     let body = [];
// request
//   .on('data', chunk => {
//     body.push(chunk);
//   })
//   .on('end', () => {
//     body = Buffer.concat(body).toString();
//     // at this point, `body` has the entire request body stored in it as a string
//   });
// });
// server.listen(8080, () => {
//   console.log('🚀 Server is running and listening on http://localhost:8080');
// });

// In the real world, we use frameworks like Express or libraries like body-parser so we don't
//  manually type this out every time. However, knowing that requests are raw streams is 
//  crucial for handling massive uploads like images or videos without crashing your server's 
//  memory.

// import http from 'node:http';

// http
//   .createServer((request, response) => {
//     const { headers, method, url } = request;
//     let body = [];
//     request
//       .on('error', err => {
//         console.error(err);
//       })
//       .on('data', chunk => {
//         body.push(chunk);
//       })
//       .on('end', () => {
//         body = Buffer.concat(body).toString();
//         // At this point, we have the headers, method, url and body, and can now
//         // do whatever we need to in order to respond to this request.
//       });
//   })
//   .listen(8080,()=>
// {
//     console.log("server listening on port: http:localhost:8080");
// }); // Activates this server, listening on port 8080.

// HTTP Status Code
// If you don't bother setting it, the HTTP status code on a response will always be 200. 
// Of course, not every HTTP response warrants this, and at some point you'll definitely 
// want to send a different status code. To do that, you can set the statusCode property.

// response.statusCode = 404; // Tell the client that the resource wasn't found.

// Setting Response Headers
// Headers are set through a convenient method called setHeader.

// response.setHeader('Content-Type', 'application/json');
// response.setHeader('X-Powered-By', 'bacon');


// Explicitly Sending Header Data

// response.writeHead(200, {
//   'Content-Type': 'application/json',
//   'X-Powered-By': 'bacon',
// });


// Sending Response Body
// Since the response object is a WritableStream, writing a response body out to the client 
// is just a matter of using the usual stream methods.

// response.write('<html>');
// response.write('<body>');
// response.write('<h1>Hello, World!</h1>');
// response.write('</body>');
// response.write('</html>');
// response.end();



// Put It All Together
// Now that we've learned about making HTTP responses, let's put it all together. Building 
// on the earlier example, we're going to make a server that sends back all of the data that 
// was sent to us by the user. We'll format that data as JSON using JSON.stringify.

// import http from 'node:http';

// http
//   .createServer((request, response) => {
//     const { headers, method, url } = request;
//     let body = [];
//     request
//       .on('error', err => {
//         console.error(err);
//       })
//       .on('data', chunk => {
//         body.push(chunk);
//       })
//       .on('end', () => {
//         body = Buffer.concat(body).toString();
//         console.log("body: ",body);

//         // BEGINNING OF NEW STUFF

//         response.on('error', err => {
//           console.error(err);
//         });

//         response.statusCode = 200;
//         response.setHeader('Content-Type', 'application/json');
//         // Note: the 2 lines above could be replaced with this next one:
//         // response.writeHead(200, {'Content-Type': 'application/json'})

//         const responseBody = { headers, method, url, body };

//         response.write(JSON.stringify(responseBody));
//         response.end();
//         // Note: the 2 lines above could be replaced with this next one:
//         // response.end(JSON.stringify(responseBody))

//         // END OF NEW STUFF
//       });
//   })
//   .listen(8080, () => {
//   console.log('🚀 Server is running and listening on http://localhost:8080');
//    });


// Echo Server Example
// import http from 'node:http';

// http
//   .createServer((request, response) => {
//     if (request.method === 'POST' && request.url === '/echo') {
//       let body = [];
//       request
//         .on('data', chunk => {
//           body.push(chunk);
//         })
//         .on('end', () => {
//           body = Buffer.concat(body).toString();
//           response.end(body);
//         });
//     } else {
//       response.statusCode = 404;
//       response.end();
//     }
//   })
//   .listen(8080,() => {
//    console.log('🚀 Server is running and listening on http://localhost:8080');
//     });


// import http from 'node:http';
// http
//   .createServer((request, response) => {
//     request.on('error', err => {
//       console.error(err);
//       response.statusCode = 400;
//       response.end();
//     });
//     response.on('error', err => {
//       console.error(err);
//     });
//     if (request.method === 'POST' && request.url === '/echo') {
//       request.pipe(response);
//     } else {
//       response.statusCode = 404;
//       response.end();
//     }
//   })
//   .listen(8080,()=>{
//     console.log("server is runnign and listening on http://localhost:8080");
//   });



import fs from 'node:fs';

// --- Buffers ---
const buf = Buffer.from('Hello', 'utf-8'); // Raw bytes inside RAM
console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString('hex'));