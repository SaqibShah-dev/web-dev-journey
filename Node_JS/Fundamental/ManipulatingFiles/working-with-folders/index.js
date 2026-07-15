// 1. Creating a Folder (Building the Box)
// Before you put files anywhere, you need to make sure the folder actually exists. If 
// you try to write a file into a folder that doesn't exist, Node.js will crash.

// import fs from 'node:fs';

// const folderName = './my-new-folder';

// // 1. Check if the "box" already exists
// if (!fs.existsSync(folderName)) {
  
//   // 2. If it doesn't, build it!
//   fs.mkdirSync(folderName);
//   console.log('Folder created successfully!');
// }

// fs.existsSync(): Returns true if the folder is there, and false if it isn't.

// fs.mkdirSync(): "Make Directory". This actually builds the folder on your computer.

// Reading a Folder 
// If you want to see a list of everything inside a folder, you use readdirSync(). By default, 
// this only gives you the names of the files, not their full locations.

// import fs from "node:fs";
// const contents = fs.readdirSync('./my-new-folder');
// console.log(contents); 


// Getting the full paths:
// import path from 'node:path';
// import fs from "node:fs";

// const fullPaths = fs.readdirSync('./my-new-folder').map(fileName => {
//   return path.join('./my-new-folder', fileName);
// });
// console.log(fullPaths);

// Filtering out sub-folders (Files Only)
// import path from "node:path";
// import fs from "node:fs";

// const filesOnly = fs.readdirSync('./my-new-folder')
//   .map(fileName => path.join('./my-new-folder', fileName))
//   .filter(filePath => {
//     console.log(filePath);
//     return fs.lstatSync(filePath).isFile(); 
//   });

//   Renaming a Folder
// Using the modern Promise style (async/await)
// import fs from 'node:fs/promises';

// try {
//   await fs.rename('./my-new-folder', './my-folder');
//   console.log('Folder renamed!');
// } catch (err) {
//   console.error('Something went wrong:', err);
// }

// Deleting a Folder

// Method A: Deleting an empty folder
// If you are absolutely sure the folder is completely empty, you can use rmdir:
import fs from "node:fs";
// try {
//     fs.rmdirSync('./my-folder')
//     console.log("deleting successfully!");
// } catch (error) {
//     console.log("error: ",error);
// }

try {
    fs.rmSync('./my-folder', { recursive: true, force: true });
    console.log("deleting successfully!");
} catch (error) {
    console.log("error : ",error);
}