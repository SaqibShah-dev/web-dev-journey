const fs = require('fs/promises');
console.log(await fs.readFile('./notes.txt', 'utf-8'));