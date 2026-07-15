// A file descriptor is what you get when you do this manually, in separate steps: open the
//  file first (getting back a number that represents "this specific open file"), THEN perform 
//  operations using that number, THEN explicitly close it when done.

// Think of a file descriptor as a claim ticket at a coat check.

// When you hand your heavy winter coat (the actual file on your hard drive) to the 
//     attendant (the Operating System), they don't make you carry the coat around. Instead,
//      they hand you a tiny plastic slip with a number on it, like 3.

// As long as you hold ticket 3, you don't have to worry about where the coat is stored in the
//  back room.

// When you want to check what's in the pockets (read the file), you show ticket 3.

// When you want to sew a patch onto it (write to the file), you show ticket 3.

// When you are ready to leave and go home, you hand the ticket back to the attendant so they 
// can put the coat away and free up that hanger (closing the file).

// import fs from 'node:fs';

// fs.open('./dummyText.txt', 'r', (err, fd) => {
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("File descriptor : ",fd);
// });

// Notice the r we used as the second parameter to the fs.open() call.

// That flag means we open the file for reading.

// Other flags you'll commonly use are:

// Flag	Description	File gets created if it doesn't exist
// r+	This flag opens the file for reading and writing	❌
// w+	This flag opens the file for reading and writing and it also positions the stream at 
//     the beginning of the file	✅
// a	This flag opens the file for writing and it also positions the stream at the end of 
//     the file	✅
// a+	This flag opens the file for reading and writing and it also positions the stream 
//     at the end of the file	✅


// import fs from 'node:fs';

// try {
//   const fd = fs.openSync('./dummyText.txt', 'r');
//   console.log(fd)
// } catch (err) {
//   console.error(err);
// }

import fs from "node:fs/promises";
// Or const fs = require('fs').promises before v14.
async function example() {
  let filehandle;
  try {
    filehandle = await fs.open('./dummyText.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
  }
}
example();