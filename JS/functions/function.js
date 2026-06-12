// Functions = Magic Machines
// A function is like a machine that does a job every time you push its button. 
// You can use it again and again without rebuilding it.
function makeSandwich() {
  console.log("Put bread");
  console.log("Put cheese");
  console.log("Put bread on top");
}
// Now, whenever you're hungry, you just press the button:
// javascriptmakeSandwich(); // does all 3 steps instantly!
// You don't have to write all those steps again — the machine remembers them for you!
// Even cooler — machines that take requests:
function makeSandwich(filling) {
  console.log("Put bread");
  console.log("Put " + filling);
  console.log("Put bread on top");
}

// makeSandwich("peanut butter"); // makes a peanut butter sandwich
// makeSandwich("jam");           // makes a jam sandwich
// Same machine, but you tell it what filling you want!

// "A function is a 'subprogram'..."
// Think of a function as a mini-program inside your main program — a self-contained
//  block of code that does one specific job, which you can run (or "call") whenever 
//  you need it.
function makeSandwich() {
  console.log("Bread");
  console.log("Filling");
  console.log("Bread");
}

makeSandwich(); 


// "called by code external (or internal, in case of recursion)"
// External = code outside the function calls it (the normal case — you write 
//   makeSandwich() somewhere in your program).
// Internal (recursion) = a function calls itself from within its own body. This 
// is a more advanced technique:
function countdown(n) {
  console.log(n);
  if (n > 0) {
    countdown(n - 1); // function calling itself
  }
}
countdown(3);
// 3
// 2
// 1
// 0

// "composed of a sequence of statements called the function body"
// The "function body" is just the code between the curly braces { } — the actual 
// instructions the function will run.
function example() {
  // everything in here is the "function body"
  console.log("Step 1");
  console.log("Step 2");
}
// "Values can be passed to a function as parameters, and the function will return 
// a value"
// Parameters = inputs you give the function
// Return value = output the function gives back
function add(a, b) {  // a and b are parameters (inputs)
  return a + b;        // returns a value (output)
}

const result = add(3, 5); // result = 8

// "Functions are first-class objects"
// This is the most important concept here for understanding why JavaScript 
// functions are so flexible. "First-class" means functions are treated like 
// any other value (numbers, strings, etc.) — you can:
// 1. Assign them to variables
const greet = function() {
  console.log("Hello!");
};


// 2. Pass them as arguments to other functions
function callFunction(fn) {
  fn(); // calling the function passed in
}

callFunction(greet); // "Hello!"


// 3. Return them from other functions
function createGreeter() {
  return function() {
    console.log("Hi there!");
  };
}
const greeter = createGreeter();
greeter(); // "Hi there!"


// "They can also have properties and methods just like any other object"
// This might be surprising — functions aren't just code, they're also objects 
// under the hood, so you can attach extra information to them:
function changeFunctionProperty() {
  console.log("Hello!");
}

changeFunctionProperty.language = "English"; // adding a property to a function!
changeFunctionProperty.description = "A simple greeting function"; // adding another property
console.log("Language : ",changeFunctionProperty.language); // "English"
console.log("Description: ",changeFunctionProperty.description);
console.log("Name: ",changeFunctionProperty.name);

console.log("Function type:",typeof changeFunctionProperty);   // "function"


// "Every function is actually a Function object"
// This connects to what we discussed earlier — functions are objects. Specifically,
//  every function you write is an instance of Function, similar to how [1, 2, 3] is an 
//  instance of Array. This is why functions have built-in properties and methods.
function dummyfun() {}

console.log(dummyfun instanceof Function); // true

// Instance properties — the useful ones
// length — tells you how many parameters a function expects:
function add(a, b, c) {
  return a + b + c;
}
console.log("function length",add.length); // 3

// name — the function's name as a string:
function demofun() {}
console.log("Function name:",demofun.name); // "demofun"

const sayHi = () => {};
console.log("Function name:",sayHi.name); // "sayHi"

// arguments and caller — these are outdated/legacy. Modern JavaScript avoids them. 
// (We'll use the rest parameter ...args instead, which is the modern replacement for
//    arguments.)
// Old way (avoid)
function oldSum() {
  console.log("Arguments:",arguments); // [1, 2, 3]
}
oldSum(1, 2, 3);

// Modern way
function newSum(...args) {
  console.log("New arguments:",args); // [1, 2, 3]
}
newSum(1, 2, 3);

// Instance methods — these are the important part
// These three methods (call, apply, bind) all deal with controlling what this refers 
// to inside a function. Remember earlier we mentioned this behaves differently in regular
//  vs arrow functions? These methods let you manually set what this should be.
// call() — runs the function immediately, letting you specify this and pass arguments one
//  by one:
function introduce(greeting) {
  console.log(greeting + ", I'm " + this.name);
}

const person1 = { name: "Alex" };

introduce.call(person1, "Hello"); // "Hello, I'm Alex"
// Without call, introduce() wouldn't know what this.name should be. call lets you say "run 
// this function, but pretend this is person."


// apply()  — same as call, but arguments are passed as an array:
introduce.apply(person1, ["Hi"]); // "Hi, I'm Alex"
// The only difference between call and apply is how you pass arguments: 
// call(thisValue, arg1, arg2, ...) vs apply(thisValue, [arg1, arg2, ...]).

// bind() — doesn't run the function immediately. Instead, it returns a new 
// function with this permanently set:
const boundIntroduce = introduce.bind(person1);
boundIntroduce("Hey"); // "Hey, I'm Alex" — runs later, but 'this' is locked to 'person'


// A practical example of why bind matters
// This is a very common real-world scenario, especially with event listeners:

const button = {
  label: "Submit",
  click: function() {
    console.log("Clicked: " + this.label);
  }
};

button.click(); // "Clicked: Submit" — works fine here

// But if we pass it elsewhere...
const clickHandler = button.click;
clickHandler(); // "Clicked: undefined" — 'this' is lost!

// Fix with bind:
const boundClickHandler = button.click.bind(button);
boundClickHandler(); // "Clicked: Submit" — 'this' is preserved

// When you pass a method around separately from its object, it "forgets" what this
//  was supposed to be. bind fixes this by locking this to a specific object permanently.


// 1. Function DeclarationsThis is the classic way to define a function using 
// the function keyword with a name.

function greetAlex(name) {
  return "Hello, " + name + "!";
}

console.log(greetAlex("Alex")); // "Hello, Alex!"



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

Hi(); // works fine!

function Hi() {
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


greetMahima(); // "Hello, Mahima!"
function greetMahima() {
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


// 1. Default parameters
function greetUser(name = "Guest") {
  return "Hello, " + name;
}
console.log("Greet user:",greetUser()); // "Hello, Guest"


// 2. Rest parameters (...args)
function calsum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log("Sum:",calsum(1, 2, 3)); // 6

// 3. The spread operator in function calls
function add(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log("Add:",add(...nums)); // 6

// 4. Immediately Invoked Function Expressions (IIFE)
(function() {
  console.log("Runs immediately!");
})();

// 5. Callback functions (a special use-case of HOFs — very common for async work)
function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded!");
  }, 1000);
}

fetchData((message) => console.log(message)); // after 1 sec: "Data loaded!"