const name = process.argv[2]; 
console.log(`Hello, ${name}!`);

console.log(process.argv)

if (!name) {
    console.log("Please provide a name! Usage: node greet.js YourName");
} else {
    console.log(`Hello, ${name}!`);
}