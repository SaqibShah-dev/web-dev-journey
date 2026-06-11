// 1. Function DeclarationsThis is the classic way to define a function using 
// the function keyword with a name.

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alex")); // "Hello, Alex!"



// 2. Function Expressions
// Here, you create a function and assign it to a variable. The function itself can be 
// anonymous (no name).
const greetsam = function(name) {
  return "Hello, " + name + "!";
};

console.log(greetsam("Sam")); // "Hello, Sam!"



// 3. Arrow Functions
// A more compact syntax introduced in ES6, using =>. They're especially popular for short 
// functions.
const greetMe = (name) => {
  return "Hello, " + name + "!";
};

console.log(greetMe("Jordan")); // "Hello, Jordan!"
// If the function body is just one line that returns a value, you can shorten it 
// further:
const greetme = name => "Hello, " + name + "!";

console.log(greetme("Taylor")); // "Hello, Taylor!"
// A few syntax notes:

// One parameter → parentheses are optional: name => or (name) =>
// No parameters → empty parentheses required: () => "Hello!"
// Multiple parameters → parentheses required: (a, b) => a + b

// Important difference: arrow functions and this
// Arrow functions don't have their own this — they inherit it from the surrounding code. 
// This matters more in object methods and event handlers, but as a beginner, just be aware 
// regular functions and arrow functions can behave differently with this.


const person = {
  name: "Alex",
  // Regular function — 'this' refers to 'person'
  greetRegular: function() {
    console.log("Hi, I'm " + this.name);
  },
  // Arrow function — 'this' does NOT refer to 'person'
  greetArrow: () => {
    console.log("Hi, I'm " + this.name); // undefined or unexpected
  }
};

person.greetRegular(); // "Hi, I'm Alex"
person.greetArrow();   // "Hi, I'm undefined" (or similar)


// 4. Closures
// A closure happens when a function "remembers" the variables from where it was created, 
// even after the outer function has finished running.

function createCounter() {
  let count = 0; // this variable is "enclosed"

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log("Counter:",counter()); // 1
console.log("Counter:",counter()); // 2
console.log("Counter:",counter()); // 3

// Even though createCounter() has already finished running, the inner function still has 
// access to count and remembers its value between calls. This is useful for creating private
//  variables — count can't be accessed directly from outside, only through the returned 
//  function.
console.log("Counter:",counter.count); // undefined — count is private!

// A practical example: separate counters
const counterA = createCounter();


const counterB = createCounter();

console.log("Counter A:",counterA()); // 1
console.log("Counter A:",counterA()); // 2
console.log("Counter B:",counterB()); // 1 — independent from counterA!



// 5. Higher-Order Functions (HOFs)
// A higher-order function is a function that either:
// takes another function as an argument, or
// returns a function as its result
// You've actually already seen one — createCounter() returns a function, so it's a HOF!
// Common built-in HOFs you'll use constantly:


const numbers = [1, 2, 3, 4, 5];

// map() — transforms each item, returns a new array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() — keeps items that pass a test, returns a new array
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce() — combines all items into a single value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15


// Writing your own HOF
function repeatAction(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeatAction(3, (i) => {
  console.log("Iteration: " + i);
});
// Iteration: 0
// Iteration: 1
// Iteration: 2


// A good way to practice
// Try writing a function that returns another function — like a multiplier generator:
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


// A key feature of function declarations: they're hoisted, meaning you can call 
// them before they appear in the code.

sayHi(); // works fine!

function sayHi() {
  console.log("Hi!");
}

// This works because of a behavior called hoisting.
// Hoisting refers to the behavior where JavaScript moves the declarations of variables,
//  functions, and classes to the top of their scope during the compilation phase. 
//  This can sometimes lead to surprising results, especially when using var, let, 
//  const, or function expressions.
// Hoisting applies to variable and function declarations.
// Initializations are not hoisted, they are only declarations.
// 'var' variables are hoisted with undefined, while 'let' and 'const' 
// are hoisted but remain in the Temporal Dead Zone until initialized.

// The Temporal Dead Zone (TDZ) is the period in JavaScript between entering a 
// scope and the initialization of variables declared with let or const, during
//  which accessing them results in an error.

// Variables declared with let and const are hoisted but not initialized.
// Accessing these variables before their declaration throws a ReferenceError.
// Initialization occurs only when execution reaches the declaration line.
// TDZ exists only within the scope where the variable is declared.
// It applies only to let and const, not to var (which is initialized as undefined).

// hello(); // TypeError: hello is not a function
// var hello = function() {
//     console.log("Hi!");
// };

// Note: The variable hello is hoisted, but it is not initialized until the assignment line 
// is reached since it holds a function expression. Thus, calling hello() before its 
// initialization throws a TypeError.

// Types of Hoisting
// Hoisting in JavaScript refers to moving declarations to the top of their scope 
// before code execution.

// 1. Variable Hoisting with var
// When you use var to declare a variable, the declaration is hoisted to the top,
//  but its value is not assigned until the code execution reaches the variable’s
//   initialization. This results in the variable being assigned undefined during 
//   the hoisting phase.


console.log(a); // undefined
var a = 5;
// Note: The declaration var a is hoisted to the top, but a is initialized with undefined. 
// Hence, logging results in undefined.
// Note: var hoisting lifts declarations, not initializations.

// 2. Variable Hoisting with let and const
// Unlike var, let and const are also hoisted, but they remain in a Temporal Dead Zone (TDZ) 
// from the start of the block until their declaration is encountered. Accessing them before 
// their declaration will throw a ReferenceError.


// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// let b = 10;

// Note: The variable is hoisted, but it’s in the Temporal Dead Zone (TDZ) until the 
// declaration line is executed.

// 3. Function Declaration Hoisting
// Function declarations are hoisted with both their name and the function body. 
// This means the function can be called before its definition in the code.


greet(); // "Hello, Mahima!"
function greet() {
    console.log("Hello, Mahima!");
}
// Note: The function declaration is hoisted, and the entire function definition is available 
// before its position in the code.

// 4. Function Expression Hoisting
// Function expressions are treated like variable declarations. The variable itself is 
// hoisted, but the function expression is not assigned until the line of execution. 
// This means calling the function before its assignment will result in an error.

// hello(); // TypeError: hello is not a function
// var hello = function() {
//     console.log("Hi!");
// };

// 5. Hoisting with let and const in Functions
// Variables declared with let and const inside a function are hoisted to the top of 
// the function's scope, but they remain in the TDZ. This prevents access to them before 
// they are initialized.

// function test() {
//     console.log(x); // ReferenceError: Cannot access 'x' before initialization
//     let x = 50;
// }
// test();'

// 6. Hoisting with Classes
// Classes are hoisted, but they cannot be accessed before they are declared, resulting in 
// a ReferenceError.

// const obj = new MyClass(); // ReferenceError
// class MyClass {
//     constructor() {
//         this.name = "Mahima Bhardwaj";
//     }
// }
// Note: Although the class MyClass is hoisted, it cannot be accessed before its 
// declaration due to the TDZ, which is why the code throws a ReferenceError.

// 7.Re-declaring Variables with var
// With var, you can redeclare a variable within the same scope. This is a unique 
// behavior compared to let and const.

var a = 10;
var a = 20; // No error
console.log(a); // 20
// Note: With var, the second declaration overwrites the first one without throwing
//  an error.

// 8. Accessing Variables Declared Later in Loops
// When using var in loops, the loop variable is hoisted to the function or global scope, 
// which can cause unexpected behavior. If you use let, the variable is block-scoped and 
// behaves as expected.

for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3
    }, 100);
}
// Note: The var i is hoisted, and all setTimeout functions share the same i reference, 
// which results in the value 3 after the loop finishes.

// 9. Using Hoisted Functions with Parameters
// Functions can be hoisted with their parameters, but any parameters passed to the function
//  are still determined by the invocation, not by the hoisting.

test(10); // 10
function test(num) {
    console.log("num val",num);
}
// Note : The entire function, including its parameters, is hoisted and available for 
// use before the function's declaration in the code.

// 10. Hoisting in Nested Functions
// Hoisting works within nested functions as well. Variables declared with var inside 
// a function are hoisted to the top of that function scope.

function outer() {
    console.log(a); // undefined
    var a = 5;
    function inner() {
        console.log(b); // undefined
        var b = 10;
    }
    inner();
}
outer();
// Note: Both a and b are hoisted within their respective scopes (outer and inner functions),
//  but their values are not set until the code execution reaches the initialization lines.