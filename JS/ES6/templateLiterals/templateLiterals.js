const name = "Alex";
const age = 25;

const message = "Hello, my name is " + name + " and I am " + age + " years old.";
console.log(message);
// "Hello, my name is Alex and I am 25 years old."

// The new way — template literals:

const newMessage = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(newMessage);
// "Hello, my name is Alex and I am 25 years old."

// Notice:
// Backticks ` instead of quotes " or '
// ${ } to insert variables directly — called interpolation
// You've actually already been using these throughout our whole conversation! Anywhere 
// you've seen `${variable}` — that's a template literal.

// Why template literals are better — multiple benefits
// 1. No more + concatenation headaches
// Old way — easy to make mistakes
const count = 12;
const usingOldWay = "Hi " + name + ", you have " + count + " new messages.";

// New way — clear and readable
const usingNewWay = `Hi ${name}, you have ${count} new messages.`;


// 2. You can put expressions inside ${ }, not just variables
const price = 100;
const tax = 0.1;

console.log(`Total: $${price + (price * tax)}`); // "Total: $110"
console.log(`Half price: $${price / 2}`);        // "Half price: $50"

const isVip = true;
console.log(`Status: ${isVip ? "VIP Member" : "Regular Member"}`); // "Status: VIP Member"

// 3. Multi-line strings — this is a huge improvement
// Old way — had to use \n manually, very ugly
const oldWay = "Line 1\nLine 2\nLine 3";

// New way — just press Enter naturally inside backticks!
const newWay = `Line 1
Line 2
Line 3`;

console.log(newWay);
// Line 1
// Line 2
// Line 3

// 4. Function calls inside template literals
function getDiscount(price) {
    return price * 0.9;
}

const price = 100;
console.log(`Discounted price: $${getDiscount(price)}`); // "Discounted price: $90"

// 5. Combining with objects (something you already know!)
const user = { name: "Alex", age: 25 };

console.log(`${user.name} is ${user.age} years old.`);
// "Alex is 25 years old."