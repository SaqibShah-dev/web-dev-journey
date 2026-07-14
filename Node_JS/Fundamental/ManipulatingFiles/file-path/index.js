// What Are Paths?
// In programming, a path is a string that specifies the location of a file or directory 
// within a file system. In Node.js, paths are essential for performing file operations, 
// importing modules, and managing resources.

// Types of Paths
// Paths can be broadly classified into two categories: absolute paths and relative paths.

// 1. Absolute Paths
// An absolute path provides the complete address to a file or directory, starting from the 
// root of the file system. It does not depend on the current working directory.

// Unix/Linux: Absolute paths begin with a /.
//      Example: /home/user/documents/file.txt
// Windows: Absolute paths may start with a drive letter, followed by a colon and a backslash.
//      Example: C:\Users\User\Documents\file.txt
// Key Characteristics:
// Always points to the same location regardless of the current working directory.
// Starts with the root directory or drive letter.

// 2. Relative Paths
// A relative path describes the location of a file or directory in relation to the current 
// working directory. It does not start with a / or drive letter.

// ./: Represents the current directory.
// Example: ./file.txt refers to file.txt in the current directory.
// ../: Represents the parent directory. It moves up one level in the directory structure.
// Example: ../file.txt refers to file.txt in the parent directory.
// common/: Refers to a subdirectory named common within the current directory.
// Example: common/ram.txt refers to ram.txt in the common directory, equivalent
//  to ./common/ram.txt.

// Key Characteristics:
// Depends on the current working directory.
// Useful for referencing files and directories in a more flexible way.
// Common Path Notations
// Let’s delve into some common path notations and their meanings:

// /:
// In absolute paths, it represents the root of the file system. In web URLs, it signifies the 
// root of the web application.
// ./:
// Indicates the current directory. You can use this when you want to access a file or 
// directory relative to where your script is running.
// ../:
// Used to go up one level in the directory structure. This is useful when you need to access
//  files in parent directories.
// /path/to/file:
// An absolute path that indicates the exact location of a file, starting from the root 
// directory.

// Best Practices for Using Paths
// Use path Module: Always use Node.js's built-in path module to handle paths. This ensures 
// that your application works across different operating systems.
// Avoid Hardcoding Paths: Instead of hardcoding absolute paths, use relative paths or dynamic
//  path construction with __dirname or process.cwd().
// Be Mindful of Current Working Directory: When using relative paths, be aware of the current
//  working directory to avoid unexpected file access errors.
// __dirname: Provides the absolute path to the directory containing the current script, useful
//  for constructing paths relative to that script.
// process.cwd(): Returns the current working directory where the Node.js process was started, 
// useful for paths related to where the command was run.

// import path from 'node:path';

// const filePath = './example-notes.txt';
// const fileExtension = path.extname(filePath);

// console.log(`File Extension: ${fileExtension}`); 
// //  Uses path.resolve() to convert a sequence of path segments into an absolute path.
// const absolutePath = path.resolve('users', 'gfg', 'documents');
// console.log(absolutePath);


// The path.basename() method is used to get the filename portion of a path to the file. The 
// trailing directory separators are ignored when using this method. Syntax:
// path.basename( path, extension )
// Parameters: This method accepts two parameters as mentioned above and described below:
// path: It is the file path that would be used to extract the filename.
// extension: It is an optional file extension that would be removed from the returned string.


// const path1 = path.basename('/Node_JS/Fundamental/ManipulatingFiles/file-path/example-notes.txt');
// console.log(path1)

// Using the extension parameter
// const path2 = path.basename('/Node_JS/Fundamental/ManipulatingFiles/file-path/example-notes.txt', '.txt');
// console.log(path2)

// The path.dirname() method is used to get the directory name of the given path. It ignores 
// the respective platform's trailing directory separators. Syntax:
// path.dirname( path )
// Parameters: This function accepts one parameter as mentioned above and described below:
// path: It is the file path that would be used to extract the directory name. It throws a 
// TypeError if this parameter is not a string value.

// Node.js program to demonstrate the    
// path.dirname() method 
 

// Import the path module (ES Modules)
// import path from 'path';
 
// // 1. Directory of a hardcoded path
// const path1 = path.dirname('/HTML/practice_project.html');
// console.log("Path 1:", path1); // Output: /HTML
 
// // 2. Relative file path (returns '.')
// const path2 = path.dirname("practice_project.html");
// console.log("Path 2:", path2); // Output: .
 
// // 3. Path with directory but no file specified 
// const path3 = path.dirname("../file-path");
// console.log("Path 3:", path3); // Output: ..

// const currentFile = import.meta.filename; 
// console.log("File name:", currentFile);

// const folderOfCurrentFile = path.dirname(currentFile);
// console.log("Folder of current file:", folderOfCurrentFile);
 
// const currentDir = import.meta.dirname; 
// console.log("Directory name:", currentDir);

// // Find the parent directory of the current directory:
// const parentDir = path.dirname(currentDir);
// console.log("Parent Directory of current directory:", parentDir);


// The path.extname() method is used to get the extension portion of a file path. The 
// extension string returned from the last occurrence of a period (.) in the path to the
//  end of the path string. If there are no periods in the file path, then an empty string 
//  is returned. Syntax:
// path.extname( path )

// import path from "node:path";

// const path1 = path.extname("./example-notes.txt")
// console.log(path1);


// The path.format() method is used to return a path string from the given path object. The 
// method has some rules where one path property gets more priority over another:
// The "root" parameter of the path object is ignored if the "dir" parameter is provided.
// The "ext" and "name" parameter of the path object are ignored if the "base" parameter is 
// provided.
// Syntax:
// path.format( pathObject )
// Parameters: This function accepts single parameter pathObject that contains the details of 
// the path. It has the following parameters:
// dir: It specifies the directory name of the path object.
// root: It specifies the root of the path object.
// base: It specifies the base of the path object.
// name: It specifies the file name of the path object.
// ext: It specifies the file extension of the path object.


// // Import the path module
// import path from "node:path";

// // CASE 1
// // If "dir", "root" and "base" are all given,
// // "root" is ignored.
// let path1 = path.format({
//     root: "/ignored/root/",
//     dir: "/home/user/personal",
//     base: "details.txt",
// });
// console.log("Path 1:", path1);

// // CASE 2
// // If "dir" is not specified then "root" will be used 
// // If only "root" is provided
// // platform separator will not be included.
// // "ext" will be ignored.
// let path2 = path.format({
//     root: "/",
//     base: "game.dat",
//     ext: ".noextension",
// });
// console.log("Path 2:", path2);

// // CASE 3
// // If "base" is not specified
// // "name" and "ext" will be used 
// let path3 = path.format({
//     root: "/images/",
//     name: "image",
//     ext: ".jpg",
// });
// console.log("Path 3:", path3);


