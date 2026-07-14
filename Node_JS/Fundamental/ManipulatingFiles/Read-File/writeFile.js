// import fs from 'fs';

// Writing a file

// const content = "Hello beginner";

// fs.writeFile("./notes.txt",content,err =>{
//     if(err){
//         console.log("error",err);
//     }
// });

// Writing a file synchronously
// import fs from "fs"
// const content = "Hello node.js beginner";

// try {
//     fs.writeFileSync("./notes.txt",content);
// } catch (error) {
//     console.log("error : ",error);
// }

//  promise-based
// import fs from "fs/promises";

// const content = "Hello guys ";

// try {
//     await fs.writeFile("./notes.txt",content)
// } catch (error) {
//     console.log("error : ",error)
// }

// Appending content to a file

// import fs from "fs";
// const content = "Counting: 123456789";
// fs.appendFile("./notes.txt",content,error =>{
//     if(error){
//         console.log("error : ",error);
//     }
// });

    
// with Promises

// import fs from "fs/promises";
// const content = "How are you ";

// try {
//     await fs.appendFile("./notes.txt",content);
// } catch (error) {
//     console.log("error : ",error);
// }