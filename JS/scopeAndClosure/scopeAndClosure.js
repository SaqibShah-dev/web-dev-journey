// This is going to explain "scope" simply.🏠 House (Global Scope)
//    └── 🚪 Living Room (Function Scope)
//          └── 🚪 Bedroom (Function Scope)
// Rule: You can see things in your OWN room, and any room OUTSIDE you (bigger rooms),
//  but NOT inside smaller rooms.

// 🏠 House (Global)
const houseName = "My House";

function livingRoom() {
    // 🚪 Living Room
    const tv = "Samsung TV";
    
    console.log(houseName); // ✅ can see this (bigger room, outside)
    console.log(tv);         // ✅ can see this (my own room)
}

livingRoom();

// console.log(tv); // ❌ ERROR! Can't see inside living room from outside

// Lexical Scope — simple meaning
// "Lexical" just means "where you wrote the code".
// RULE: A function can see variables based on WHERE you WROTE it, not where you CALLED
//  it from.

// Real life example:
const phoneNumber = "123-456"; // 🏠 stays in the house (global)

function bedroom() {
    // 🚪 Bedroom
    console.log(phoneNumber); // can I see the house phone? YES!
}

bedroom(); // calling it doesn't matter — it ALREADY knows what it can see

// It doesn't matter WHERE you call bedroom() from. The function already "knows"
//  what it can see, based on where it was written (inside the house).

// Closures — simple meaning
// A closure is when a room remembers things even after you leave it.
// Real life story:
// Imagine you're in your bedroom, and you write a sticky note that says "Mom's
//  recipe: 2 cups sugar." You then GIVE this sticky note to your friend. Even after 
//  you leave the bedroom forever, your friend STILL has access to that sticky note 
//  information.

function bedroom1() {
    const recipe = "2 cups sugar"; // sticky note created in bedroom
    
    function giveToFriend() {
        return recipe; // friend can still read the sticky note!
    }
    
    return giveToFriend; // hand the friend the ability to read it
}

const friend = bedroom1(); // bedroom() FINISHED running already!

console.log(friend()); // "2 cups sugar" — still works! 😲

// Wait — how does this work if bedroom() already finished?
// Normally, when a function finishes, everything inside it disappears
//(the room gets "cleaned up"). But if you create an inner function and give it away
// (return it), JavaScript keeps that one sticky note ALIVE just for that inner function.


// Step 1: bedroom() runs
//         → recipe = "2 cups sugar" created
//         → giveToFriend function created (remembers 'recipe')
//         → bedroom() RETURNS giveToFriend
//         → bedroom() finishes... room normally gets cleaned

// Step 2: BUT giveToFriend still needs 'recipe'!
//         → JavaScript keeps 'recipe' ALIVE, just for giveToFriend
//         → This special "keeping alive" = CLOSURE


// Let's see this with your OWN to-do list example (you already built this!)
function makeDeleteButton(item) {
    const btn = document.createElement("button");
    
    btn.addEventListener("click", () => {
        item.remove(); // remembers WHICH item, even later!
    });
    
    return btn;
}
// When you click the button days later, it still remembers exactly which 
// item to delete — because of closure! The button "took a sticky note" with it that 
// says "delete THIS specific item."

// Simple counter example — step by step very slowly
function createCounter() {
    let count = 0; // sticky note: "count = 0"
    
    return function() {
        count = count + 1; // update sticky note
        return count;       // read sticky note
    };
}
// What happens when you run this:
const myCounter = createCounter();

// Picture this happening:

// 1. createCounter() starts running
// 2. count = 0 is written on a sticky note 📝 "count = 0"
// 3. A new function is created — let's call it "the clicker"
// 4. "the clicker" is given the sticky note to keep forever
// 5. createCounter() returns "the clicker"
// 6. createCounter() finishes (but sticky note survives, because clicker needs it!)
// 7. myCounter now = "the clicker" (with its sticky note attached)

console.log(myCounter()); // 1
// 1. myCounter() runs (this is "the clicker")
// 2. Looks at its sticky note: "count = 0"
// 3. Updates it: "count = 1"
// 4. Returns 1


// Now — IIFE (the new word)
// IIFE = a function that runs immediately, the moment you write it. You never call 
// it later — it just runs right away, once.
// Think of it like a microwave with auto-start:
// Normal microwave: you put food in, THEN press start.
function microwave() {
    console.log("Heating food!");
}

microwave(); // you press "start" separately

// IIFE microwave: starts heating the MOMENT you put food in — no separate button 
// press needed.
(function() {
    console.log("Heating food!"); // runs IMMEDIATELY!
})();

// A practical IIFE + Closure combo (the "Secret Box" pattern)
const SecretBox = (function() {
    let secret = "my password"; // hidden inside closet
    
    return {
        reveal: function() {
            return secret; // friend allowed to peek at sticky note
        }
    };
})();

console.log(SecretBox.reveal()); // "my password" ✅
// console.log(SecretBox.secret);   // undefined ❌ — can't access directly!

// Try this yourself — predict the output
function createGreeting(name) {
    const greeting = "Hello, " + name + "!"; // sticky note
    
    return function() {
        return greeting; // remembers the sticky note
    };
}

const greetAlex = createGreeting("Alex");
const greetSam = createGreeting("Sam");

console.log(greetAlex()); // ?
console.log(greetSam());  // ?
