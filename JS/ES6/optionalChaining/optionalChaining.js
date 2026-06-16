// Optional chaining lets you safely access nested properties — without your code crashing 
// if something in the middle doesn't exist.

// The problem it solves:
const user = {
    name: "Alex"
    // no 'address' property!
};

// console.log(user.address.city); // ❌ TypeError: Cannot read property 'city' of undefined

// This crashes because user.address is undefined, and you're trying to access .city on 
// undefined — which doesn't exist.

// The old way to fix this (before optional chaining existed):
// Had to manually check every step
console.log("Using old way : ",user && user.address && user.address.city);
// undefined (no crash, but verbose!)

// The new way — optional chaining:
console.log("Using optional chaining: ",user?.address?.city); // undefined (no crash!) ✅
// The ?. says: "If the thing before me is null or undefined, STOP here and return undefined
//  — don't try to go further and crash."

// How it works step by step
const user1 = { name: "Alex" }; // no address property
console.log(user1?.address?.city);

// What happens:
// Step 1: user?.        → user exists? YES → continue
// Step 2: .address?.    → user.address exists? NO (undefined) → STOP, return undefined
// Step 3: .city          → never even attempted!
// Result: undefined — no crash!

// Comparing WITH and WITHOUT optional chaining

const user2 = { 
    name: "Alex", 
    address: { city: "New York" } 
};

const user3 = { 
    name: "Sam" 
    // no address!
};

// WITHOUT optional chaining:
console.log(user2.address.city); // "New York" ✅ works fine
// console.log(user3.address.city); // ❌ CRASHES the whole script!

// WITH optional chaining:
console.log(user2?.address?.city); // "New York" ✅ works fine
console.log(user3?.address?.city); // undefined ✅ no crash!

// Real-world use case — API data (this is the #1 reason it exists)
// When you fetch() data from a server, you often don't know exactly what shape the 
// data will be — some fields might be missing.

async function getUser() {
    const response = await fetch("https://api.example.com/users/1");
    const user = await response.json();
    
    // Without optional chaining — risky!
    console.log("fetch data optional chaining does not handle it ",user.profile.avatar.url); // might crash if any piece is missing
    
    // With optional chaining — safe!
    console.log("fetch data optional chaining handle it",user?.profile?.avatar?.url); // undefined if missing, no crash
}
// getUser();


// Optional chaining with FUNCTIONS
// You can also use ?.() to safely call a function that might not exist:
const user4 = {
    name: "Alex",
    greet() {
        console.log("Hi!");
    }
};

user4.greet?.();   // "Hi!" — function exists, runs normally
user4.sayBye?.();  // nothing happens — function doesn't exist, no crash!
// Without ?.(), calling user.sayBye() directly would throw: TypeError: user.sayBye 
// is not a function

// Optional chaining with ARRAYS
const users = [
    { name: "Alex", hobbies: ["reading", "coding"] },
    { name: "Sam" } // no hobbies!
];

console.log(users[0]?.hobbies?.[0]); // "reading" ✅
console.log(users[1]?.hobbies?.[0]); // undefined ✅ (no crash!)
console.log(users[5]?.hobbies?.[0]); // undefined ✅ (user doesn't even exist, 
// still no c

// Combining with the Nullish Coalescing Operator (??) — a natural pairing
// Optional chaining returns undefined when something is missing. Often, you want to
//  provide a default value instead of just undefined. That's exactly what ?? does:
const user5 = { name: "Alex" }; // no address

const city = user5?.address?.city ?? "Unknown city";
console.log(city); // "Unknown city" ✅


// Why not just use || instead of ???
const count = 0;
console.log(count || "No count"); // "No count" ❌ wrong! 0 is treated as falsy
console.log(count ?? "No count"); // 0 ✅ correct! 0 is a valid value, just not 
// null/undefined
// ?? only triggers for null or undefined — NOT for 0, false, or "" (empty string), 
// which || would incorrectly treat as "missing."

// Putting it all together — practical example
const usersData = [
    { name: "Alex", address: { city: "NYC" }, age: 0 },
    { name: "Sam" }
];

usersData.forEach(user => {
    const city = user?.address?.city ?? "Unknown";
    const age = user?.age ?? "Not specified";
    
    console.log(`${user.name} lives in ${city} and is ${age} years old.`);
});

// Alex lives in NYC and is 0 years old.        (age=0 correctly shown, not "Not specified"!)
// Sam lives in Unknown and is Not specified years old.