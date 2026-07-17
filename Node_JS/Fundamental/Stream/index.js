// Streams are a way to handle reading/writing files, network communications, or any kind of 
// end-to-end information exchange in an efficient way.

// What makes streams unique, is that instead of a program reading a file into memory all at 
// once like in the traditional way, streams read chunks of data piece by piece, processing 
// its content without keeping it all in memory.

// This makes streams really powerful when working with large amounts of data, for example, a 
// file size can be larger than your free memory space, making it impossible to read the whole 
// file into the memory in order to process it. That’s where streams come to the rescue!

// Using streams to process smaller chunks of data, makes it possible to read larger files.

// Let’s take a “streaming” services such as YouTube or Netflix for example: these services 
// don’t make you download the video and audio feed all at once. Instead, your browser receives 
// the video as a continuous flow of chunks, allowing the recipients to start watching and/or 
// listening almost immediately.

// Why streams
// Streams basically provide two major advantages compared to other data handling methods:

// Memory efficiency: you don’t need to load large amounts of data in memory before you are 
//     able to process it
// Time efficiency: it takes significantly less time to start processing data as soon as you 
//      have it, rather than having to wait with processing until the entire payload has been 
//    transmitted

// Types of Streams in Node.js:
// There are namely four types of streams in Node.js.

// Writable: We can write data to these streams.
// Readable: We can read data from these streams.
// Duplex: Streams that are both, Writable as well as Readable.
// Transform: Streams that can modify or transform the data as it is written and read.


// 1. Readable Streams

// import fs from "node:fs";

// // Create a readable stream
// const readableStream = fs.createReadStream('largefile.txt', { encoding: 'utf8' });

// // Listen for data events and process chunks
// readableStream.on('data', (chunk) => {
//   console.log('Chunk received:', chunk);
// });

// // Listen for the end event when no more data is available
// readableStream.on('end', () => {
//   console.log('No more data.');
// });

// // Handle error event
// readableStream.on('error', (err) => {
//   console.error('Error reading the file:', err);
// });


// 2. Writable Streams

// import fs from "node:fs";

// // Create a writable stream
// const writableStream = fs.createWriteStream('output.txt');

// // Write chunks to the writable stream
// writableStream.write('Hello, World!\n');
// writableStream.write('Streaming data...\n');

// // End the stream (important to avoid hanging the process)
// writableStream.end('Done writing.\n');

// // Listen for the finish event
// writableStream.on('finish', () => {
//   console.log('Data has been written to output.txt');
// });

// // Handle error event
// writableStream.on('error', (err) => {
//   console.error('Error writing to the file:', err);
// });

// 3. Duplex Streams
// Duplex streams can both read and write data. A typical example of a duplex stream is a 
// network socket, where you can send and receive data simultaneously.

// import { Duplex } from "node:stream";

// const duplexStream = new Duplex({
//   write(chunk, encoding, callback) {
//     console.log(`Writing: ${chunk.toString()}`);
//     callback();
//   },
//   read(size) {
//     this.push('More data');
//     this.push(null);  // End the stream
//   }
// });

// // Write to the duplex stream
// duplexStream.write('Hello Duplex!\n');

// // Read from the duplex stream
// duplexStream.on('data', (chunk) => {
//   console.log(`Read: ${chunk}`);
// });

// 4. Transform Streams
// Transform streams modify the data as it passes through the stream. For example, a 
// transform stream could compress, encrypt, or manipulate data.
// import { Transform } from 'node:stream';

// // Create a transform stream that converts data to uppercase
// const transformStream = new Transform({
//   transform(chunk, encoding, callback) {
//     this.push(chunk.toString().toUpperCase());
//     callback();
//   }
// });

// // Pipe input to transform stream and then output the result
// process.stdin.pipe(transformStream).pipe(process.stdout);

// Key Methods and Concepts
// 1. Piping StreamsThe easiest way to consume streams is using the .pipe() method. It 
// automatically forwards data from a readable stream directly into a writable stream.
// import fs from "node:fs";

// const readStream = fs.createReadStream('./largefile.txt');
// const writeStream = fs.createWriteStream('output_copy.txt');

// // Efficiently copies data without loading the whole file into RAM
// readStream.pipe(writeStream); 


// 2. Event-Driven Consumption
// import fs from "node:fs";
// const readableStream = fs.createReadStream('./largefile.txt', 'utf8');

// // Emitted whenever a chunk of data is ready to be handled
// readableStream.on('data', (chunk) => {
//   console.log(`Received ${chunk.length} bytes of data.`);
// });

// // Emitted when there is no more data left to read
// readableStream.on('end', () => {
//   console.log('Finished reading data.');
// });

// // Emitted if an issue occurs during extraction
// readableStream.on('error', (err) => {
//   console.error('An error occurred:', err.message);
// });

// Real-World Example: Streaming an HTTP Video File
import http  from 'node:http';
import fs from 'node:fs';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'video/mp4' });
  
  const videoStream = fs.createReadStream('');
  
  // Streams the video chunks incrementally directly to the browser
  videoStream.pipe(res); 
}).listen(3000);

