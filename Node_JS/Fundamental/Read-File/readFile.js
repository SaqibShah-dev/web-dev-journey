// import fs from 'fs';

// console.log(fs.readFileSync('./notes.txt', 'utf-8'));

import fs from 'fs/promises'

console.log(await fs.readFile('./notes.txt','utf-8'));