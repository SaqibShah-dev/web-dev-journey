// An object is a way to group related information together using labeled pairs — each
//  piece of data has a name (called a "key") and a value.
const person = {
  name: "Alex",
  age: 25,
  city: "New York"
};

// Think of it like a profile card or an ID card — instead of separate loose variables, 
// everything about one "thing" is bundled together with labels.

// Without an object (messy, hard to keep track of)
const personName = "Alex";
const personAge = 25;
const personCity = "New York";

// With an object (organized, all in one place)
const person1 = {
  name: "Alex",
  age: 25,
  city: "New York"
};

// Accessing values — you use the label (key) to get the value:
console.log(person1.name); // "Alex"
console.log(person1.age);  // 25


// Comparing to an array (since you just learned that):
// Array                                             Object
// ["Alex", 25, "New York"]                    { name: "Alex", age: 25, city: "New York" }
// Items accessed by position (0, 1, 2)         Items accessed by name (name, age, city)
// Good for lists of similar things.            Good for describing one thing with multiple properties
// In one sentence: an object is a container that stores information as named labels
//  and their values, so you can describe something (like a person, a product, or a car) 
//  in an organized way.

const car = {
  brand: "Toyota",
  color: "red",
  year: 2022
};

console.log(car.brand); // "Toyota"
console.log(car.color); // "red"
console.log(car.year);  // 2022


// 1. Destructuring — pulling values out of an object
// Destructuring lets you "unpack" properties from an object into their own 
// variables, instead of writing user.name, user.age, etc. every time.
// Without destructuring:
const user = {
  name: "Alex",
  age: 25,
  city: "New York"
};
const userName = user.name;
const userAge = user.age;

console.log(userName); // "Alex"
console.log(userAge);  // 25

// With destructuring (same result, shorter):
const { name, age } = user;

console.log(name); // "Alex"
console.log(age);  // 25
// The variable names must match the property names in the object. JavaScript looks 
// for name and age properties inside user and creates matching variables.
// Renaming while destructuring:

// If you want a different variable name, use ::
const { name: uname, age: uage } = user;

console.log(uname); // "Alex"
console.log(uage);  // 25
// Default values:
// If a property doesn't exist, you can set a fallback:
const user1 = {
  name1: "Alex",
  age1: 25,
  city1: "New York"
};
const { name1, country = "Unknown" } = user1;

console.log("name: ",name1);    // "Alex"
console.log("country: ",country); // "Unknown" — user.country doesn't exist,
//  so default is used

// Destructuring in function parameters (very common!):
function greet({ name, age }) {
  console.log("Hi " + name + ", you are " + age + " years old.");
}
greet(user); // "Hi Alex, you are 25 years old."

// Instead of writing function greet(user) { ... user.name ... user.age ... }, you 
// destructure right in the parameter list — very common in real-world code, especially 
// with React.

// 2. Spread operator (...) with objects
// Just like with arrays, spread "expands" an object's properties. It's mainly
//  used for copying and merging objects.
// Copying an object:

const original = { name: "Alex", age: 25 };
const copy = { ...original };

copy.age = 30;

console.log("Original:", original.age); // 25 — unchanged!
console.log("Copy:", copy.age);     // 30

// This creates a new object with the same properties — changing the copy doesn't 
// affect the original (remember our earlier discussion about reference types? Spread 
//     creates a new object instead of just copying the reference).

// Merging objects:
const personalInfo = { name: "Alex", age: 25 };
const jobInfo = { title: "Developer", company: "TechCorp" };

const fullProfile = { ...personalInfo, ...jobInfo };

console.log("Full Profile:", fullProfile);
// { name: "Alex", age: 25, title: "Developer", company: "TechCorp" }

// Overriding properties while copying (very useful!):
const user2 = { name: "Alex", age: 25, city: "New York" };

const updatedUser = { ...user2, age: 26 }; // copy everything, but change 'age'

console.log("Updated User:", updatedUser); // { name: "Alex", age: 26, city: "New York" }
console.log("Original User:", user2);       // { name: "Alex", age: 25, city: "New York" }
//  — unchanged!

// 3. Object.keys(), Object.values(), Object.entries()
// These three methods let you turn an object into an array, so you can use
//  array methods like map, filter, forEach on objects too.
// Object.keys() — get all property names:
console.log(Object.keys(user));
// ["name", "age", "city"]

// Object.values() — get all property values:
console.log(Object.values(user));
// ["Alex", 25, "New York"]

// Object.entries() — get [key, value] pairs:
console.log(Object.entries(user));
// [["name", "Alex"], ["age", 25], ["city", "New York"]]

// Why this is useful — looping through an object:
// You can't directly use .map() or .forEach() on an object (only arrays 
// have those methods). So Object.entries() is the bridge:
Object.entries(user).forEach(([key, value]) => {
  console.log(key + ": " + value);
});
// name: Alex
// age: 25
// city: New York

// Here, [key, value] is array destructuring (from earlier!) being used on 
// each [key, value] pair returned by entries().
// Another common use — checking if an object is empty:
const emptyObj = {};
console.log(Object.keys(emptyObj).length); // 0 — empty!

console.log(Object.keys(user).length); // 3 — has 3 properties


// Connecting back to arrays
// Remember the users array from earlier?
const users = [
  { name: "Alex", age: 25 },
  { name: "Sam", age: 17 },
  { name: "Jordan", age: 30 }
];
// Now you can combine everything you've learned:
// Destructure inside map
const summaries = users.map(({ name, age }) => `${name} is ${age} years old`);
console.log(summaries);
// ["Alex is 25 years old", "Sam is 17 years old", "Jordan is 30 years old"]

// 1. Bracket notation (accessing properties dynamically)
const user3 = { name: "Alex", age: 25 };
console.log(user3["name"]); // "Alex" — same as user3.name
// Useful when the key is a variable or has spaces/special characters
const key = "age";
console.log(user3[key]); // 25
const obj = { "first name": "Alex" };
console.log(obj["first name"]); // dot notation wouldn't work here

// 2. Adding, updating, and deleting properties
const user4 = { name: "Alex" };
user4.age = 25;        // add a new property
user4.name = "Sam";     // update existing property
delete user4.age;        // remove a property
console.log(user4); // { name: "Sam" }

// 3. Checking if a property exists
const user5 = { name: "Alex" };
console.log("name" in user5); // true
console.log("age" in user5);  // false
console.log(user5.hasOwnProperty("name")); // true

// 4. Nested objects (objects inside objects)
const user6 = {
  name: "Alex",
  address: {
    city: "New York",
    zip: "10001"
  }
};
console.log(user6.address.city,user6.address); // "New York"
// Nested destructuring
const { address: { city } } = user6;
console.log(city); // "New York"


// 5. Methods inside objects (functions as object properties)
const person2 = {
  name: "Alex",
  greet: function() {
    console.log("Hi, I'm " + this.name);
  },
  // Shorthand syntax (ES6+)
  greetShort() {
    console.log("Hey, I'm " + this.name);
  }
};
person2.greet();      // "Hi, I'm Alex"
person2.greetShort(); // "Hey, I'm Alex"

// 6. Optional chaining (?.) — safely accessing nested properties
const user7 = { name: "Alex" };

// console.log(user7.address.city);  // ❌ Error! address doesn't exist
console.log(user7.address?.city); // ✅ undefined (no error)
// Very useful when data might be missing (common with API responses).


// The problematic case: arrow function as a method
const person3 = {
  name: "Alex",
  greet2: function() {
    console.log("Hi, I'm " + this.name);
  },
  greetShort2() {
    console.log("Hey, I'm " + this.name);
  },
  // ❌ Arrow function as a method
  greetArrow: () => {
    console.log("Hello, I'm " + this.name);
  }
};

person3.greet2();      // "Hi, I'm Alex"      ✅
person3.greetShort2(); // "Hey, I'm Alex"     ✅
person3.greetArrow(); // "Hello, I'm undefined" ❌

// Visualizing it
const person4 = {
  name: "Alex",
  
  // 'this' is determined by HOW the function is CALLED
  regular: function() {
    console.log(this); // person object
  },
  
  // 'this' is determined by WHERE the function is WRITTEN (here, top-level)
  arrow: () => {
    console.log(this); // {} or undefined or window — NOT person
  }
};

person4.regular(); // this = person ✅
person4.arrow();   // this = whatever 'this' was outside the object ❌


// The problem: regular functions lose this inside callbacks
const person5 = {
  name: "Alex",
  hobbies: ["reading", "coding", "gaming"],
  
  showHobbies: function() {
    console.log(this.name + "'s hobbies:");  
    this.hobbies.forEach(function(hobby) {
      console.log(this.name + " likes " + hobby); // ❌ this.name is undefined!
    });
  }
};

person5.showHobbies();
// "Alex's hobbies:"
// "undefined likes reading"
// "undefined likes coding"
// "undefined likes gaming"

// Why does this happen?
// showHobbies is called as person.showHobbies(), so inside it, this correctly
//  refers to person. ✅
// But the callback function passed to forEach is a separate function. When forEach
//  calls it internally, it doesn't call it as person.something() — so this inside that 
//  callback is not person. It becomes undefined (in strict mode) or the global object.
// So you have two different this values in the same method — the outer one (person) 
// and the inner one (lost).


// The fix: use an arrow function for the callback
const person6 = {
  name: "Alex",
  hobbies: ["reading", "coding", "gaming"],
  
  showHobbies: function() {
    console.log(this.name + "'s hobbies:");
    
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " likes " + hobby); // ✅ works!
    });
  }
};
person6.showHobbies();
// "Alex's hobbies:"
// "Alex likes reading"
// "Alex likes coding"
// "Alex likes gaming
// Why does this fix it?
// Remember: arrow functions don't have their own this — they inherit it from 
// where they're written.
// The arrow function is written inside showHobbies. At that point in the code, 
// this already correctly refers to person (because showHobbies is a regular 
//   function called as person.showHobbies()). The arrow function simply "looks 
//   outward" and reuses that same this — it doesn't create its own.


// Real-world example — this exact pattern is everywhere
// const counter = {
//   count: 0,
//   start: function() {
//     setInterval(() => {
//       this.count++; // arrow function — 'this' = counter ✅
//       console.log(this.count);
//     }, 1000);
//   }
// };
// counter.start(); // logs 1, 2, 3, 4... every second
// If setInterval's callback were a regular function instead, 
// this.count++ would fail because this wouldn't be counter anymore.


// A callback function is simply a function that you pass as an argument into
//  another function, so that the other function can "call it back" later — either 
//  immediately, or after something finishes.
function greet(name) {
  console.log("Hello, " + name);
}

function processUser(callback) {
  const userName = "Alex";
  callback(userName); // "calling back" the function we were given
}

processUser(greet); // "Hello, Alex"