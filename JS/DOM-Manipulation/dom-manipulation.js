// Let's move into DOM manipulation — this is where JavaScript actually starts controlling
//  what you see on a webpage. This connects everything you've learned (variables, functions,
//   objects) to real visual results.
// What is the DOM?
// The DOM (Document Object Model) is how JavaScript "sees" your HTML page — as a
//  tree of objects that you can read and change.

// 1. querySelector() — finding elements
// querySelector() finds the first element that matches a CSS selector (same syntax
//  you'd use in CSS).
const title = document.querySelector("#title");      // by id
console.log(title);
const button = document.querySelector(".btn");        // by class
console.log(button);
const firstItem = document.querySelector("li");       // by tag name
console.log(firstItem);

// Reading and changing content:
console.log("Title Content:", title.textContent); // "Hello"

title.textContent = "Hi there!"; // changes the text on the page!
console.log("Update title : ",title.textContent);

// Changing styles:
title.style.color = "blue";
title.style.fontSize = "30px";

// Changing attributes/classes:
button.classList.add("active");     // add a CSS class
console.log("button class list",button.classList);
button.classList.remove("active");  // remove a class
console.log("remove class list ",button.classList);
button.classList.toggle("active");  // add if missing, remove if present
console.log("toggle class list ",button.classList);
button.setAttribute("disabled", "");        // add an attribute (e.g. disable a button)
console.log("button set attributes: ",button.attributes);
button.removeAttribute("disabled");       // remove an attribute
console.log("button remove attributes: ",button.attributes);

// querySelectorAll() — finding multiple elements
const items = document.querySelectorAll("li");
console.log(items.length); // 2
// Loop through them
items.forEach(item => {
  item.style.color = "green";
});
// querySelectorAll returns a NodeList — similar to an array, so you can use 
// forEach on it (but not all array methods directly, without converting it first).

// 2. Events — responding to user actions
// An "event" is something that happens — a click, a key press, a mouse move, a
//  form submit, etc. addEventListener() lets you run a function (a callback, connecting 
//     to what you just learned!) whenever that event happens.
const button1 = document.querySelector(".btn");
button1.addEventListener("click", function() {
  console.log("Button was clicked!");
});

// Common events:
// Click
button1.addEventListener("click", () => {
  console.log("Clicked!");
});

// Typing in an input
// const input = document.querySelector("input");
const input = document.getElementById("input");
input.addEventListener("input", (event) => {
  console.log("You typed:", event.target.value);
});

// Key press
document.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
});

// The event object
// When an event fires, JavaScript passes an event object with useful info — especially 
// event.target, which is the element the event happened on.
const button3 = document.querySelector(".btn");
button3.addEventListener("click", (event) => {
  console.log(event.target); // the button element itself
  event.target.style.backgroundColor = "yellow";
});

const counterBtn = document.getElementById("counterBtn");
let count = 0; // closure-like behavior — remembers value between clicks!
counterBtn.addEventListener("click", () => {
  count++;
  counterBtn.textContent = "Clicked: " + count + " times";
});
// This is a closure in action (from earlier!) — the event handler 
// "remembers" count between clicks.

// 3. createElement() — making new elements
// So far we've been working with elements already in the HTML.
//  createElement() lets you build new elements with JavaScript and add 
//  them to the page.
// Step-by-step process:
// 1. Create the element
const newItem = document.createElement("li");
// 2. Add content to it
newItem.textContent = "Item 3";

// 3. Add it to the page (pick a parent element)
const list = document.querySelector("#list");
list.appendChild(newItem);

// Adding styles/classes to a new element:
const newItem2 = document.createElement("li");
newItem2.textContent = "Item 4";
newItem2.classList.add("highlight");
newItem2.style.fontWeight = "bold";
list.appendChild(newItem2);

// Removing elements:
const firstItem1 = document.querySelector("li");
firstItem1.remove(); // removes it from the page


// 1. Event delegation — instead of adding a listener to every item individually, 
// add ONE listener to the parent and detect which child was clicked. More efficient 
// for large/dynamic lists.


list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("selected");
        console.log("Selected using toggle:",event.target.classList.toggle);
        
    }
});
// This solves the same to-do list problem with less code and works automatically for
//  items added later — a cleaner alternative to attaching listeners one-by-one.

// 2. preventDefault() — stops a form/link's default browser behavior (very common 
// with forms):
// form.addEventListener("submit", (event) => {
//     event.preventDefault(); // stops the page from reloading
//     // ... handle the form data yourself
// });

// 3. innerHTML vs textContent
// element.textContent = "<b>Hello</b>"; // shows literally: <b>Hello</b>
// element.innerHTML = "<b>Hello</b>";   // renders as bold: Hello
// ⚠️ innerHTML can be a security risk (XSS) if used with untrusted user
//  input — generally prefer textContent unless you specifically need HTML.


// 4. Other ways to insert elements
// parent.prepend(newItem);          // add to the beginning
// existingItem.before(newItem);     // insert before another element
// existingItem.after(newItem);      // insert after another element
// parent.insertBefore(newItem, existingItem); // older syntax


// 5. Traversing the DOM — navigating between related elements:
// element.parentElement;     // the parent
// element.children;          // direct children
// element.nextElementSibling; // the next element at the same level
// element.previousElementSibling;

// 6. Form elements & validation
// const checkbox = document.querySelector("#agree");
// console.log(checkbox.checked); // true/false

// const select = document.querySelector("#country");
// console.log(select.value);