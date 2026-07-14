// import fs from 'node:fs';

// const content = 'Some content!';

// fs.writeFile('./test.txt', content, err => {
//   if (err) {
//     console.error(err);
//   } 
// });


// Writing a file synchronously

// import fs from 'node:fs';

// const content = 'Some content!';

// try {
//   fs.writeFileSync('./test.txt', content);
// } catch (err) {
//   console.error(err);
// }


// You can also use the promise-based fsPromises.writeFile() method offered by
//  the fs/promises module:

// import fs from 'node:fs/promises';

// try {
//   const content = 'Some content!';
//   await fs.writeFile('/Users/joe/test.txt', content);
// } catch (err) {
//   console.log(err);
// }

// Appending content to a file

// import fs from 'node:fs';

// const content = 'Some content!';

// fs.appendFile('./test.txt', content, err => {
//   if (err) {
//     console.error(err);
//   } 
// });
// console.log(fs)


// Let's Build: A Mini Log Rotator

import fs from 'node:fs/promises';
import path from 'node:path';

async function writeLog(message) {
  const logDir = './logs';
  const logFile = path.join(logDir, 'system.log');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  try {
    // 1. Ensure the directory exists first, otherwise writeFile/appendFile will fail
    await fs.mkdir(logDir, { recursive: true });

    // 2. Append the log entry to the file safely
    await fs.appendFile(logFile, logEntry);
    console.log('Log entry recorded.');
  } catch (err) {
    console.error('Failed to write log:', err.message);
  }
}

// Test the logger
await writeLog('Server started on port 3000');
await writeLog('Database connection established');
