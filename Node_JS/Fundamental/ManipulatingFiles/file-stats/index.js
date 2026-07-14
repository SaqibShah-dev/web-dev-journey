// Node.js needs a way to talk to your computer's operating system to look at files. The 
// fs.stat() method is like asking Node.js: "Hey, go look at this specific file or folder 
// and tell me everything you can find out about it."

// The fs stands for File System, and stat is short for status.
// fs.stat( path, options, callback )

// path (Where to go): The location of the file or folder on your computer
//  (e.g., './documents/resume.pdf').

// options (How to bring it back - Optional): Extra instructions. For example, if you are 
// dealing with massive files, you can ask for the numbers to be returned as bigint (huge 
//     integers) instead of standard numbers.

// callback (What to do when they get back): Because Node.js is asynchronous (it doesn't 
//     like to sit around waiting), you provide a function that runs only after Node.js 
//     finishes looking up the file.

// import fs from 'fs';

// fs.stat('./file.txt', (err, stats) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log("stats: ",stats);
// });

// Node.js also provides a sync method, which blocks the thread until the file stats are ready:

// import fs from 'fs'

// try {
//     const stats = fs.statSync("../file-stats");
//     console.log("stats: ",stats);
    
// } catch (error) {
//     console.log('error: ',error);
    
// }

// The file information is included in the stats variable. What kind of information can we 
// extract using the stats?

// A lot, including:

// if the file is a directory or a file, using stats.isFile() and stats.isDirectory()
// if the file is a symbolic link using stats.isSymbolicLink()
// the file size in bytes using stats.size.
// There are other advanced methods, but the bulk of what you'll use in your day-to-day 
// programming is this.

// import fs from 'fs'

// try {
//     const stats = fs.statSync("../file-stats");
//     console.log("stats: ",stats);
    
//   console.log(stats.isDirectory()); // true
//   console.log(stats.isSymbolicLink()); // false
//   console.log(stats.size); // 1024000 //= 1MB
// } catch (error) {
//     console.log('error: ',error); 
// }

// You can also use promise-based fsPromises.stat() method offered by the fs/promises module
//  if you like:

import fs from 'node:fs/promises';

async function example() {
  try {
    const stats = await fs.stat('../file-stats');
    console.log(stats.isFile()); // false
    console.log(stats.isDirectory()); // true
    console.log(stats.isSymbolicLink()); // false
    console.log(stats.size); // 1024000 //= 1MB 
  } catch (err) {
    console.log(err);
  }
}
example();