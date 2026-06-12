// An array is just a list of values stored in a single variable, in order.
const fruits = ["apple", "banana", "cherry"];
// Think of it like a row of numbered boxes — each box holds one item, and you 
// can find any item by its position number (called an index), starting from 0.
console.log(fruits[0]); // "apple"  (first item)
console.log(fruits[1]); // "banana" (second item)
console.log(fruits[2]); // "cherry" (third item)
// Key things about arrays:
// They can hold any type of value — numbers, strings, booleans, even other arrays or objects.
const mixed = [1, "hello", true, [1, 2], { name: "Alex" }];
// You can check how many items it has using .length:
console.log(fruits.length); // 3
// You can add, remove, or change items:
fruits.push("orange");   // add to end → ["apple", "banana", "cherry", "orange"]
fruits.pop();             // remove from end → ["apple", "banana", "cherry"]
fruits[0] = "mango";       // change first item → ["mango", "banana", "cherry"]
// In one sentence: an array is a way to store and organize multiple values together, 
// so you can work with them as a group instead of creating separate variables for each 
// one.
// Without an array (messy)
const fruit1 = "apple";
const fruit2 = "banana";
const fruit3 = "cherry";

// With an array (clean)
const fruitsArr = ["apple", "banana", "cherry"];


const numbers = [5, 2, 8, 1, 9, 3];
const users = [
  { name: "Alex", age: 25 },
  { name: "Sam", age: 17 },
  { name: "Jordan", age: 30 }
];

console.log("Users : ",users);
console.log("Numbers: ",numbers);


// 1. map() — transform every item
// map() creates a new array by applying a function to every item in the
//  original array. The new array has the same length as the original.
const doubled = numbers.map(num => num * 2);
console.log("Number doubled",doubled); // [10, 4, 16, 2, 18, 6]
console.log("Original Array",numbers); // [5, 2, 8, 1, 9, 3] — original unchanged!

// Practical example with objects:
const names = users.map(user => user.name);
console.log("Names: ",names); // ["Alex", "Sam", "Jordan"]
// Think of map() as: "do this to every item, and give me back a new list of results."


// 2. filter() — keep only items that pass a test
// filter() creates a new array containing only the items for which your function
//  returns true. The result can be shorter than the original (or empty).
const bigNumbers = numbers.filter(num => num > 4);
console.log("Big Numbers: ",bigNumbers); // [5, 8, 9]
// Practical example:
const adults = users.filter(user => user.age >= 18);
console.log("Adults: ",adults); // [{ name: "Alex", age: 25 }, { name: "Jordan", age: 30 }]
// Think of filter() as: "go through the list, and only keep the ones that match this
//  condition."

// 3. reduce() — combine everything into one value
// You already saw this one! reduce() takes the whole array and "reduces" it down 
// to a single value — could be a number, string, object, anything.
const total = numbers.reduce((sum, num) => sum + num, 0);
console.log("Total: ",total); // 28


// Finding the maximum value:
const max = numbers.reduce((biggest, num) => {
  return num > biggest ? num : biggest;
}, numbers[0]);

console.log("Max: ",max); // 9


// 4. find() — get the first item that matches
// find() returns the first item in the array that passes your test — or undefined 
// if nothing matches. Unlike filter(), it returns a single item, not an array.
const firstBig = numbers.find(num => num > 4);
console.log("First Big: ",firstBig); // 5 (the first number greater than 4)

// Practical example:
const sam = users.find(user => user.name === "Sam");
console.log("Sam: ",sam); // { name: "Sam", age: 17 }

const noOneCalledMax = users.find(user => user.name === "Max");
console.log("No One Called Max: ",noOneCalledMax); // undefined
// Think of find() as: "search through the list and give me the first match — 
// or nothing if there isn't one."


// 5. sort() — reorder the array
// sort() is a bit different — it modifies the original array (unlike the others!) 
// and also returns it.
// Default behavior (sorts as strings — can be surprising!):
const nums = [10, 1, 21, 2];
console.log(nums.sort()); // [1, 10, 2, 21] — sorted as text, not numbers!

// Sorting numbers correctly — use a compare function:
const nums2 = [10, 1, 21, 2];

nums2.sort((a, b) =>{
    console.log("Comparing: ",a," and ",b);
    return a - b;
    
}); // ascending order
console.log(nums2); // [1, 2, 10, 21]

nums2.sort((a, b) => b - a); // descending order
console.log(nums2); // [21, 10, 2, 1]

// How the compare function works:
// If a - b is negative, a comes first
// If a - b is positive, b comes first
// If 0, their order doesn't change

// 6. Spread operator (...) with arrays
// The spread operator "expands" an array's items. It's incredibly useful for copying, 
// combining, and avoiding mutation.
// Copying an array (to avoid mutating the original):
const original = [3, 1, 2];
const copy = [...original];

copy.sort((a, b) => a - b);

console.log(original); // [3, 1, 2] — unchanged!
console.log(copy);     // [1, 2, 3]


// 1. More add/remove methods
const arr = [1, 2, 3];

arr.unshift(0);   // add to the beginning → [0, 1, 2, 3]
arr.shift();      // remove from the beginning → [1, 2, 3]
arr.splice(1, 1); // remove 1 item starting at index 1 → [1, 3]
arr.slice(0, 2);  // copy a portion (doesn't modify original) → [1, 3] 
// (depends on array length)

// 2. Checking arrays
console.log(Array.isArray([1, 2, 3])); // true
console.log([1, 2, 3].includes(2));    // true — does it contain this value?
console.log([1, 2, 3].indexOf(2));     // 1 — position of a value

// 3. forEach() — loop through without creating a new array
[1, 2, 3].forEach(num => console.log(num));
// 1
// 2
// 3

// 4. some() and every() — quick true/false checks
const numsArr = [1, 2, 3, 4];
console.log(numsArr.some(n => n > 3));  // true — at least one matches
console.log(numsArr.every(n => n > 3)); // false — not all match

// 5. Destructuring arrays
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first);  // "red"
console.log(second); // "green"

// 6. Nested arrays (arrays inside arrays)
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(grid[1][2]); // 6