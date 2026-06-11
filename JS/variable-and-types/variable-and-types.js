// let vs const
// Both let and const are used to declare variables, but the difference is whether 
// you can reassign the value afterward.

let score = 10;
console.log("Score", score);

score = 20; 
console.log(score);

// ✅ allowed — let can be reassigned

const name = "Alex";
console.log(name);
 // ❌ error — const cannot be reassigned
// name = "Sam";
// console.log(name);

const person = { name: "Alex" };
console.log(person.name);

person.name = "Sam"; // ✅ allowed — modifying a property is fine
console.log(person.name);
// ❌ error — reassigning the variable itself is not allowed
// person = { name: "Sam" }; 
// console.log(person.name);


// Primitive vs Reference Types
// Primitive types (like numbers, strings, booleans) are stored directly in the variable, 
// while reference types (like objects and arrays) store a reference to the value.

// Primitive types
// Primitives are: string, number, boolean, undefined, null, symbol, and bigint. 
// When you assign a primitive to a variable, the variable holds the actual value itself.
let a = 10;
let b = a; // b gets a COPY of the value 10

b = 20;

console.log("a", a); // 10 — unchanged
console.log("b", b); // 20

// Each variable has its own independent copy. Changing b has no effect on a.


// Reference types
// Reference types include objects, arrays, and functions. When you assign one of 
// these to a variable, the variable doesn't hold the actual data — it holds a 
// reference (like a pointer) to where the data lives in memory.
let obj1 = { value: 10 };
let obj2 = obj1; // obj2 points to the SAME object as obj1

obj2.value = 20;

console.log("Object1 value",obj1.value); // 20 — changed!
console.log("Object2 value",obj2.value); // 20


// Both obj1 and obj2 point to the same object in memory, so modifying it through 
// either variable affects both.
// Same idea with arrays
let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2.push(4);

console.log("Array1", arr1); // [1, 2, 3, 4] — changed!
console.log("Array2", arr2); // [1, 2, 3, 4]


// Making a real copy (avoiding shared references)
// If you want a separate copy of an object/array (so changes don't affect the original), 
//     you can use:
// javascript// For objects
let original = { name: "Alex" };

let copy = { ...original }; // spread operator creates a shallow copy

copy.name = "Sam";
console.log(original.name); // "Alex" — unaffected

// For arrays
let originalArr = [1, 2, 3];
let copyArr = [...originalArr];

copyArr.push(4);
console.log(originalArr); // [1, 2, 3] — unaffected


// Type coercion
// JavaScript is "loosely typed," meaning it will often automatically convert values from 
// one type to another when needed. This is called type coercion, and it can sometimes lead
//  to surprising results if you're not expecting it.

console.log("5" + 3);   // "53"  (number 3 becomes a string, then concatenated)
console.log("5" - 3);   // 2     (string "5" becomes a number, then subtracted)
console.log("5" * "2"); // 10    (both strings become numbers)
console.log(0 + false);  // 0     (false becomes 0)
console.log("" + null); // "null" (null becomes the string "null")

// The + operator is the trickiest one, because it's used for both addition and string 
// concatenation — if either side is a string, JavaScript converts the other side to a 
// string too. Other math operators (-, *, /) generally try to convert values to numbers.
// This is also why == (loose equality) can be confusing:
console.log(0 == "0");   // true  — coercion happens
console.log(0 == "");    // true  — coercion happens
console.log("" == "0");  // false — no coercion happens

// Because of this unpredictability, it's recommended to use === (strict equality), 
// which checks both value and type without any coercion:
console.log(0 === "0"); // false — different types, no coercion
console.log(5 === 5);   // true

// typeof
// The typeof operator tells you what type a value currently is. It's useful for 
// debugging or checking what kind of data you're working with.
console.log(typeof "hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof { a: 1 });  // "object"
console.log(typeof [1, 2, 3]); // "object"  (arrays are technically objects!)
console.log(typeof null);      // "object"  (this is a famous, long-standing JS bug)
console.log(typeof function(){}); // "function"