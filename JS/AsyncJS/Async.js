// The problem: some things take TIME Imagine you order food at a restaurant. 
// You don't just stand at the counter frozen until your food is ready — you sit 
// down, maybe check your phone, talk to someone. When the food is ready, the waiter
//  brings it to you.JavaScript works the same way. Some tasks take time:

// Getting data from a server (fetch)
// Reading a file
// Waiting for a timer
// JavaScript doesn't freeze and wait — it keeps running other code, and when
//  the slow task finishes, it comes back to handle the result.

// 1. Callbacks (you already know this!)
// The original solution was callbacks — "do this task, and call THIS function 
// when done":
setTimeout(() => {
    console.log("Food is ready!");
}, 3000);

console.log("Waiting for food...");


// But callbacks get messy when you need to chain multiple async tasks:
// "Callback Hell" 
// getUser(function(user) {
//     getOrders(user.id, function(orders) {
//         getDetails(orders[0], function(details) {
//             getReviews(details.id, function(reviews) {
//                 console.log(reviews);
//                 // keep going deeper and deeper...
//             });
//         });
//     });
// });
// This "pyramid of doom" is hard to read, hard to debug, and hard to maintain.
//  Promises were invented to solve exactly this.

// 2. Promises — a cleaner way to handle async tasks
// A Promise is like a receipt you get at a restaurant after ordering.
//  It represents something that:
    // hasn't finished yet (pending)
    // finished successfully (fulfilled) → your food arrived!
    // failed (rejected) → sorry, we're out of that dish

const myPromise = new Promise((resolve, reject) => {
    const foodReady = true; // pretend this is a real check

    setTimeout(() => {
        if (foodReady) {
            resolve("Your burger is ready! 🍔"); // success
        } else {
            reject("Sorry, we ran out of burgers. 😢"); // failure
        }
    }, 2000);
});
// Using .then() and .catch() to handle the result:
myPromise
    .then((message) => {
        console.log("Success:", message); // "Success: Your burger is ready! 🍔"
    })
    .catch((error) => {
        console.log("Error:", error); // "Error: Sorry, we ran out of burgers. 😢"
    });

console.log("I'm waiting for my food...");

// Chaining promises — solving callback hell:
// getUser()
//     .then(user => getOrders(user.id))
//     .then(orders => getDetails(orders[0]))
//     .then(details => getReviews(details.id))
//     .then(reviews => console.log(reviews))
//     .catch(error => console.log("Something went wrong:", error));

// 3 promise states:
const promise = new Promise((resolve, reject) => { });

console.log(promise); // Promise { <pending> }   — not done yet
// ... after resolve:  Promise { "value" }        — success ✅
// ... after reject:   Promise { <rejected> }     — failure ❌


// 3. async/await — the cleanest way (built on top of Promises)
// async/await is "syntactic sugar" — it doesn't add new features, it just 
// makes Promises look like normal, readable, top-to-bottom code.
// Same example as above, using async/await:
async function getFood() {
    try {
        const message = await myPromise; // "wait here until promise resolves"
        console.log("Using async awati");
        
        console.log("Success:", message);
    } catch (error) {
        console.log("Error:", error);
    }
}
getFood();
console.log("I'm waiting for my food..."); // still runs immediately!

// Key rules:
// async before a function means it always returns a Promise
// await can only be used inside an async function
// await pauses execution inside that function only — the rest of your code keeps running

// Chaining with async/await:
// async function loadEverything() {
//     const user = await getUser();
//     const orders = await getOrders(user.id);
//     const details = await getDetails(orders[0]);
//     const reviews = await getReviews(details.id);
//     console.log(reviews);
// }
// This reads exactly like normal synchronous code — top to bottom, step by step — 
// even though each await is waiting for an async operation to complete.


// 4. fetch() — getting real data from the internet
// fetch() is the built-in browser function for making network requests (like asking a 
//     server for data). It returns a Promise — so you use it with async/await or .then().
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json()) // convert raw response to JSON object
    .then(data => console.log(data))
    .catch(error => console.log("Error:", error));

// Same thing with async/await (cleaner):
async function getUser() {
    console.log("use async to fetch data from internet");
    
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json();
    console.log(data);
}

getUser();

// Two awaits — why?
// const response = await fetch(url);  // Step 1: wait for server to respond
// const data = await response.json(); // Step 2: wait for response body to be parsed as JSON

// Step 1 gets the raw HTTP response (headers, status code, etc.) — the body isn't fully
//  downloaded yet
// Step 2 actually reads and parses the body as JSON — this also takes a tiny moment, so 
// it's also async
// Think of it like:
// Step 1: The delivery person arrives at your door (response headers)
// Step 2: You open the box and take out the food (parse the JSON body)

// 5. Error handling with try/catch
// When using async/await, you handle errors with try/catch — which you may have seen
//  earlier when we handled const reassignment errors.

async function getUserdata() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Something went wrong:", error.message);
    }
}

getUserdata();


// Two types of errors to handle:
async function getData() {
    try {
        // Error type 1: network failure (no internet, server down)
        const response = await fetch("https://example.com/api/data");
        // const response = await fetch("https://jsonplaceholder.typicode.com/users/1");


        // Error type 2: server responded but with an error (404, 500, etc.)
        if (!response.ok) {
            throw new Error("HTTP error : " + response.status);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        // catches BOTH types of errors
        console.log("Error:", error.message);
    } finally {
        // 'finally' always runs, success OR failure — good for cleanup
        console.log("Request finished (success or fail)");
    }
}

getData();




function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("👤 User data"), 1000); // takes 1 second
    });
}

function fetchPosts() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("📝 Posts data"), 2000); // takes 2 seconds
    });
}

function fetchComments() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("💬 Comments data"), 3000); // takes 3 seconds
    });
}
// 1. Promise.all() — wait for ALL, fail if ANY fails
// Runs all promises simultaneously and waits until every single one resolves. 
// If even one fails, the whole thing fails immediately.
async function loadAll() {
    try {
        console.log("Starting...");

        const [user, posts, comments] = await Promise.all([
            fetchUser(),
            fetchPosts(),
            fetchComments()
        ]);

        console.log(user);    // "👤 User data"
        console.log(posts);   // "📝 Posts data"
        console.log(comments);// "💬 Comments data"
        console.log("All done!");

    } catch (error) {
        console.log("One failed, so ALL failed:", error);
    }
}
loadAll();


// What if one fails?
function fetchFailPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("❌ Posts server is down!"), 2000);
    });
}

async function loadUserData() {
    try {
        const [user, posts, comments] = await Promise.all([
            fetchUser(),     // ✅ would succeed after 1 second
            fetchFailPosts(),    // ❌ fails after 2 seconds
            fetchComments()  // ✅ would succeed after 3 seconds
        ]);

    } catch (error) {
        console.log("Failed:", error); // "Failed: ❌ Posts server is down!"
    }
}

loadUserData();

// Even though fetchUser already succeeded, the whole Promise.all is thrown away and 
// .catch runs. You lose all results if one fails.
// Think of it like: A group of friends all need to arrive before the party starts.
//  If even one friend can't make it — party cancelled.
// Use Promise.all when: All results are needed together and any failure means you can't
//  continue.

// 2. Promise.allSettled() — wait for ALL, never fails
// Runs all promises simultaneously and waits for every single one to finish — whether they 
// succeed OR fail. It never throws an error — you always get results for everything.


async function loadAllSettled() {
    console.log("Starting...");

    const results = await Promise.allSettled([
        fetchUser(),
        fetchFailPosts(),    // this one fails
        fetchComments()
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Result ${index + 1} ✅:`, result.value);
        } else {
            console.log(`Result ${index + 1} ❌:`, result.reason);
        }
    });
}

loadAllSettled();


// 3. Promise.race() — whichever finishes FIRST wins
// Runs all promises simultaneously but resolves or rejects as soon as the FIRST
//  one settles — the others are ignored.
async function fastest() {
    console.log("Starting race...");

    const winner = await Promise.race([
        fetchUser(),     // finishes after 1 second
        fetchPosts(),    // finishes after 2 seconds
        fetchComments()  // finishes after 3 seconds
    ]);

    console.log("Winner:", winner); // whoever finishes first
}

fastest();

// fetchPosts and fetchComments are still running in the background — but 
// their results are simply ignored since fetchUser won the race.

// What if the fastest one fails?
function fetchFailUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("❌ User server crashed!"), 1000); // fastest but fails
    });
}

async function fastestFail() {
    try {
        const winner = await Promise.race([
            fetchFailUser(),     // fastest — but fails ❌
            fetchPosts(),    // 2 seconds
            fetchComments()  // 3 seconds
        ]);
        console.log("Winner:", winner);

    } catch (error) {
        console.log("Fastest one failed:", error);
        // "Fastest one failed: ❌ User server crashed!"
    }
}
fastestFail();
// If the first to finish rejects, Promise.race rejects too — even if the others
//  would have succeeded.

// A real use case — timeout pattern
// This is the most common real-world use of Promise.race:

function fetchData() {
    return fetch("https://jsonplaceholder.typicode.com/users");
}

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("⏰ Request timed out!"), ms);
    });
}

async function fetchWithTimeout() {
    try {
        const response = await Promise.race([
            fetchData(),      // real request
            timeout(3000)     // if it takes more than 3 seconds → reject
        ]);

        const data = await response.json();
        console.log("Got data:", data);

    } catch (error) {
        console.log("Error:", error); // either fetch error OR timeout
    }    
}

fetchWithTimeout();

// 4. Sending data with fetch() (POST requests)
async function createUser(userData) {
    const response = await fetch("https://api.example.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData) // convert object to JSON string
    });

    const newUser = await response.json();
    console.log("Created:", newUser);
}

createUser({ name: "Alex", age: 25 });


// 5. Loading states (very common in real apps)
// async function loadData() {
//     loadingSpinner.style.display = "block"; // show spinner

//     try {
//         const data = await fetchSomething();
//         displayData(data);
//     } catch (error) {
//         showError(error.message);
//     } finally {
//         loadingSpinner.style.display = "none"; // hide spinner
//     }
// }