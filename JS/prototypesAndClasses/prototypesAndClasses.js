// How do you create hundreds of similar objects without copy-pasting? How do game 
// developers spawn thousands of enemies? How does JavaScript let you build blueprints 
// for objects?


// Creating players manually — tedious and error-prone
const player1 = {
  name: "Alice",
  health: 100,
  level: 1,
  attack() {
    return `${this.name} attacks for ${10 + this.level * 2} damage!`;
  },
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      return `${this.name} has been defeated!`;
    }
    return `${this.name} has ${this.health} health remaining.`;
  }
};

const player2 = {
  name: "Bob",
  health: 100,
  level: 1,
  attack() {
    return `${this.name} attacks for ${10 + this.level * 2} damage!`;
  },
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      return `${this.name} has been defeated!`;
    }
    return `${this.name} has ${this.health} health remaining.`;
  }
};

// ... 50 more players with the same code copied ...


// What’s Wrong With This?
// Problem             	Why It’s Bad
// Repetition	           Same code copied over and over
// Error-prone	           Easy to make typos or forget properties
// Hard to maintain	  Change one thing? Change it everywhere
// No consistency	      Nothing enforces that all players have the same structure
// Memory waste	     Each object has its own copy of the methods


// What We Need
// We need a way to:
// Define the structure once
// Create as many objects as we need
// Ensure all objects have the same properties and methods
// Make changes in one place that affect all objects



// The Assembly Line Analogy
// Think about how real-world manufacturing works:
// -->Hand-crafting: each item individually is slow, inconsistent, and doesn’t scale
// -->Assembly lines: (factories) take specifications and produce products efficiently
// -->Blueprints/molds: define the template once, then stamp out identical copies
// JavaScript gives us the same options:


// ┌─────────────────────────────────────────────────────────────────────────┐
// │                    THREE WAYS TO CREATE OBJECTS                          │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │  MANUAL CREATION                 Like hand-carving each chess piece      │
// │  ───────────────                 Tedious, error-prone, inconsistent      │
// │  const obj = { ... }                                                     │
// │                                                                          │
// │  ─────────────────────────────────────────────────────────────────────   │
// │                                                                          │
// │  FACTORY FUNCTION                Like an assembly line                   │
// │  ────────────────                Put in specs → Get product              │
// │                                  Flexible, no special keywords           │
// │    createPlayer("Alice")                                                 │
// │           │                                                              │
// │           ▼                                                              │
// │    ┌─────────────┐                                                       │
// │    │   Player    │  ← New object returned                                │
// │    │  {name...}  │                                                       │
// │    └─────────────┘                                                       │
// │                                                                          │
// │  ─────────────────────────────────────────────────────────────────────   │
// │                                                                          │
// │  CLASS / CONSTRUCTOR             Like a blueprint or mold                │
// │  ───────────────────             Define template → Stamp out copies      │
// │                                  Uses `new`, supports `instanceof`       │
// │    new Player("Alice")                                                   │
// │           │                                                              │
// │           ▼                                                              │
// │    ┌─────────────┐                                                       │
// │    │   Player    │  ← Instance created from blueprint                    │
// │    │  {name...}  │                                                       │
// │    └─────────────┘                                                       │
// │                                                                          │
// └-─────────────────────────────────────────────────────────────────────────┘



// What is a Factory Function in JavaScript?
// A factory function is a regular JavaScript function that creates and returns a new object 
// each time it’s called. Unlike constructors or classes, factory functions don’t require the 
// new keyword. They can use this in returned methods (like simple objects do), or use closures
//  to avoid this entirely, giving you flexibility that classes don’t offer. As Douglas 
//  Crockford documented in JavaScript: The Good Parts, factory functions leverage 
//  JavaScript’s prototypal nature more directly than class-based patterns.


// Basic Factory Function
// Think of it like an assembly line. You put in the specifications, and it produces the
//  product:
// A simple factory function
function createPlayer(name) {
  return {
    name: name,
    health: 100,
    level: 1,
    attack() {
      return `${this.name} attacks for ${10 + this.level * 2} damage!`;
    },
    takeDamage(amount) {
      this.health -= amount;
      if (this.health <= 0) {
        return `${this.name} has been defeated!`;
      }
      return `${this.name} has ${this.health} health remaining.`;
    }
  };
}

// Creating players is now easy!
const alice = createPlayer("Alice");
const bob = createPlayer("Bob");
const charlie = createPlayer("Charlie");

console.log(alice.attack());      // "Alice attacks for 12 damage!"
console.log(bob.takeDamage(30));  // "Bob has 70 health remaining."



// Factory with Multiple Parameters
function createEnemy(name, health, attackPower) {
  return {
    name,           // Shorthand: same as name: name
    health,
    attackPower,
    isAlive: true,
    
    attack(target) {
      return `${this.name} attacks ${target.name} for ${this.attackPower} damage!`;
    },
    
    takeDamage(amount) {
      this.health -= amount;
      if (this.health <= 0) {
        this.health = 0;
        this.isAlive = false;
        return `${this.name} has been defeated!`;
      }
      return `${this.name} has ${this.health} health remaining.`;
    }
  };
}

// Create different types of enemies
const goblin = createEnemy("Goblin", 50, 10);
const dragon = createEnemy("Dragon", 500, 50);
const boss = createEnemy("Dark Lord", 1000, 100);

console.log(goblin.attack(dragon));  // "Goblin attacks Dragon for 10 damage!"
console.log(dragon.takeDamage(100)); // "Dragon has 400 health remaining."



// Factory with Configuration Object
// For many options, use a configuration object:
function createCharacter(config) {
  // Default values
  const defaults = {
    name: "Unknown",
    health: 100,
    maxHealth: 100,
    level: 1,
    experience: 0,
    attackPower: 10,
    defense: 5
  };
  
  // Merge defaults with provided config
  const settings = { ...defaults, ...config };
  
  return {
    ...settings,
    
    attack(target) {
      const damage = Math.max(0, this.attackPower - target.defense);
      return `${this.name} deals ${damage} damage to ${target.name}!`;
    },
    
    heal(amount) {
      this.health = Math.min(this.maxHealth, this.health + amount);
      return `${this.name} healed to ${this.health} health.`;
    },
    
    gainExperience(amount) {
      this.experience += amount;
      if (this.experience >= this.level * 100) {
        this.level++;
        this.experience = 0;
        this.attackPower += 5;
        return `${this.name} leveled up to ${this.level}!`;
      }
      return `${this.name} gained ${amount} XP.`;
    }
  };
}

// Create characters with different configurations
const warrior = createCharacter({
  name: "Warrior",
  health: 150,
  maxHealth: 150,
  attackPower: 20,
  defense: 10
});

const mage = createCharacter({
  name: "Mage",
  health: 80,
  maxHealth: 80,
  attackPower: 30,
  defense: 3
});

// Only override what you need
const villager = createCharacter({ name: "Villager" });


// Factory with Private Variables (Closures)
// A powerful feature of factory functions is creating truly private variables using closures:

function createBankAccount(ownerName, initialBalance = 0) {
  // Private variables — NOT accessible from outside
  let balance = initialBalance;
  const transactionHistory = [];
  
  // Private function
  function recordTransaction(type, amount) {
    transactionHistory.push({
      type,
      amount,
      balance,
      date: new Date().toISOString()
    });
  }
  
  // Initialize
  recordTransaction("opening", initialBalance);
  
  // Return public interface
  return {
    owner: ownerName,
    
    deposit(amount) {
      if (amount <= 0) {
        throw new Error("Deposit amount must be positive");
      }
      balance += amount;
      recordTransaction("deposit", amount);
      return `Deposited $${amount}. New balance: $${balance}`;
    },
    
    withdraw(amount) {
      if (amount <= 0) {
        throw new Error("Withdrawal amount must be positive");
      }
      if (amount > balance) {
        throw new Error("Insufficient funds");
      }
      balance -= amount;
      recordTransaction("withdrawal", amount);
      return `Withdrew $${amount}. New balance: $${balance}`;
    },
    
    getBalance() {
      return balance;
    },
    
    getStatement() {
      return transactionHistory.map(t => 
        `${t.date}: ${t.type} $${t.amount} (Balance: $${t.balance})`
      ).join('\n');
    }
  };
}

const account = createBankAccount("Alice", 1000);

console.log(account.deposit(500));   // "Deposited $500. New balance: $1500"
console.log(account.withdraw(200));  // "Withdrew $200. New balance: $1300"
console.log(account.getBalance());   // 1300

// Trying to access private variables — FAILS!
console.log(account.balance);              // undefined
console.log(account.transactionHistory);   // undefined

// Can't cheat!
account.balance = 1000000;                 // Does nothing useful
console.log(account.getBalance());         // Still 1300


// Factory Creating Different Types
// Factories can return different object types based on input:
function createWeapon(type) {
  const weapons = {
    sword: {
      name: "Iron Sword",
      damage: 25,
      speed: "medium",
      attack() {
        return `Slash with ${this.name} for ${this.damage} damage!`;
      }
    },
    bow: {
      name: "Longbow",
      damage: 20,
      speed: "fast",
      range: 100,
      attack() {
        return `Fire an arrow for ${this.damage} damage from ${this.range}m away!`;
      }
    },
    staff: {
      name: "Magic Staff",
      damage: 35,
      speed: "slow",
      manaCost: 10,
      attack() {
        return `Cast a spell for ${this.damage} damage! (Costs ${this.manaCost} mana)`;
      }
    }
  };
  
  if (!weapons[type]) {
    throw new Error(`Unknown weapon type: ${type}`);
  }
  
  return { ...weapons[type] };  // Return a copy
}

const sword = createWeapon("sword");
const bow = createWeapon("bow");
const staff = createWeapon("staff");

console.log(sword.attack());  // "Slash with Iron Sword for 25 damage!"
console.log(bow.attack());    // "Fire an arrow for 20 damage from 100m away!"
console.log(staff.attack());  // "Cast a spell for 35 damage! (Costs 10 mana)"


// When to Use Factory Functions
// You need truly private data
//     Factory functions with closures provide real privacy. Variables inside the factory
//       can’t be accessed or modified from outside, not even through hacks or reflection.

// You don't need instanceof checks
//     Factory-created objects are plain objects. They don’t have a special prototype chain, 
//    so instanceof won’t work. If you need to check object types, use classes instead.


// You want flexibility over structure
//     Factories can return different types of objects, partially constructed objects, or 
//     even primitives. Classes always return instances of that class.

// You prefer functional programming
// Factory functions fit well with functional programming patterns. They’re just 
// functions that return data.



// How Do Constructor Functions Work?
// A constructor function is a regular JavaScript function designed to be called 
// with the new keyword. When invoked with new, it creates a new object, binds this
//  to that object, and returns it automatically. Constructor names conventionally 
//  start with a capital letter to distinguish them from regular functions. This was
//   the standard way to create objects before ES6 classes.


// Basic Constructor Function
// Convention: Constructor names start with a capital letter
function Player(name) {
  // 'this' refers to the new object being created
  this.name = name;
  this.health = 100;
  this.level = 1;
  
  this.attack = function() {
    return `${this.name} attacks for ${10 + this.level * 2} damage!`;
  };
}

// Create instances with 'new'
const alice = new Player("Alice");
const bob = new Player("Bob");

console.log(alice.name);      // "Alice"
console.log(bob.attack());    // "Bob attacks for 12 damage!"
console.log(alice instanceof Player);  // true


// The new Keyword — What It Actually Does
// When you call new Player("Alice"), JavaScript performs 4 steps:
// 1 Create a new empty object
//     JavaScript creates a fresh object: const obj = {}

// 2 Link the prototype
//     Sets obj.[[Prototype]] to Constructor.prototype, establishing the prototype chain

// 3 Execute the constructor
//     Runs the constructor with this bound to the new object

// 4 Return the object
//     Returns obj automatically (unless the constructor explicitly returns 
//         a different non-null object; primitive return values are ignored)

// Adding Methods to the Prototype
// There’s a problem with our constructor: each instance gets its own copy of methods:

function Player(name) {
  this.name = name;
  this.health = 100;
  
  // BAD: Every player gets their own copy of this function
  this.attack = function() {
    return `${this.name} attacks!`;
  };
}

const p1 = new Player("Alice");
const p2 = new Player("Bob");

// These are different functions!
console.log(p1.attack === p2.attack);  // false

// 1000 players = 1000 copies of attack function = wasted memory!

// The solution is to put methods on the prototype:
function Player(name) {
  this.name = name;
  this.health = 100;
  // Don't put methods here!
}

// Add methods to the prototype — shared by all instances
Player.prototype.attack = function() {
  return `${this.name} attacks!`;
};

Player.prototype.takeDamage = function(amount) {
  this.health -= amount;
  return `${this.name} has ${this.health} health.`;
};

const p1 = new Player("Alice");
const p2 = new Player("Bob");

// Now they share the same function!
console.log(p1.attack === p2.attack);  // true

// 1000 players = 1 copy of attack function = efficient!


// ┌─────────────────────────────────────────────────────────────────────┐
// │ PROTOTYPE CHAIN                                                      │
// │                                                                      │
// │   Player.prototype                                                   │
// │   ┌─────────────────────────┐                                       │
// │   │ attack: function()      │                                       │
// │   │ takeDamage: function()  │◄──── Shared by all instances          │
// │   └─────────────────────────┘                                       │
// │              ▲                                                       │
// │              │ [[Prototype]]                                         │
// │              │                                                       │
// │   ┌──────────┴──────────┐                                           │
// │   │                     │                                           │
// │   ▼                     ▼                                           │
// │ ┌─────────┐         ┌─────────┐                                     │
// │ │ p1      │         │ p2      │                                     │
// │ │─────────│         │─────────│                                     │
// │ │name:    │         │name:    │                                     │
// │ │"Alice"  │         │"Bob"    │                                     │
// │ │health:  │         │health:  │                                     │
// │ │100      │         │100      │                                     │
// │ └─────────┘         └─────────┘                                     │
// │                                                                      │
// │ Each instance has its own data, but shares methods via prototype    │
// └─────────────────────────────────────────────────────────────────────┘


// The instanceof Operator
// instanceof checks if an object was created by a constructor:
function Player(name) {
  this.name = name;
}

function Enemy(name) {
  this.name = name;
}

const alice = new Player("Alice");
const goblin = new Enemy("Goblin");

console.log(alice instanceof Player);  // true
console.log(alice instanceof Enemy);   // false
console.log(goblin instanceof Enemy);  // true
console.log(goblin instanceof Player); // false

// Both are instances of Object
console.log(alice instanceof Object);  // true
console.log(goblin instanceof Object); // true

function Player(name) {
  this.name = name;
  this.health = 100;
}

// Oops! Forgot 'new'
const alice = Player("Alice");

console.log(alice);        // undefined (function returned nothing)
console.log(name);         // "Alice" — LEAKED to global scope!
console.log(health);       // 100 — ALSO leaked!

// In strict mode, this would throw an error instead
// 'use strict';
// Player("Alice");  // TypeError: Cannot set property 'name' of undefined



// What Are ES6 Classes in JavaScript?
// An ES6 class is JavaScript’s modern syntax for creating constructor functions
//  and prototypes. Introduced in ECMAScript 2015, classes provide a cleaner, more
//   familiar syntax for object-oriented programming while working exactly the same 
//   as constructor functions under the hood. They’re often called “syntactic sugar.” 
//   Classes use the class keyword and require the new operator to create instances.


// Basic Class Syntax
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.level = 1;
  }
  
  attack() {
    return `${this.name} attacks for ${10 + this.level * 2} damage!`;
  }
  
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      return `${this.name} has been defeated!`;
    }
    return `${this.name} has ${this.health} health remaining.`;
  }
}

const alice = new Player("Alice");
console.log(alice.attack());       // "Alice attacks for 12 damage!"
console.log(alice instanceof Player);  // true

// Classes Are “Syntactic Sugar”
// Classes don’t add new functionality. They’re just a nicer way to write constructor 
// functions. Under the hood, they work exactly the same:

// ES6 Class
class Enemy {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }
  
  attack() {
    return `${this.name} attacks!`;
  }
  
  static createBoss(name) {
    return new Enemy(name, 1000);
  }
}
// Equivalent ES5
function Enemy(name, health) {
  this.name = name;
  this.health = health;
}

Enemy.prototype.attack = function() {
  return `${this.name} attacks!`;
};

Enemy.createBoss = function(name) {
  return new Enemy(name, 1000);
};

// Both create objects with the same structure:
// Both versions produce:
const goblin = new Enemy("Goblin", 100);
console.log(typeof Enemy);                    // "function" (classes ARE functions!)
console.log(goblin.constructor === Enemy);    // true
console.log(goblin.__proto__ === Enemy.prototype);  // true



// Class Syntax Breakdown
class Character {
  // Class field (public property with default value)
  level = 1;
  experience = 0;
  
  // Constructor — called when you use 'new'
  constructor(name, health = 100) {
    this.name = name;
    this.health = health;
  }
  
  // Instance method — available on all instances
  attack() {
    return `${this.name} attacks!`;
  }
  
  // Another instance method
  heal(amount) {
    this.health += amount;
    return `${this.name} healed to ${this.health} HP.`;
  }
  
  // Getter — accessed like a property
  get isAlive() {
    return this.health > 0;
  }
  
  // Setter — assigned like a property
  set healthPoints(value) {
    this.health = Math.max(0, value);  // Can't go below 0
  }
  
  // Static method — called on the class, not instances
  static createHero(name) {
    return new Character(name, 150);
  }
  
  // Static property
  static MAX_LEVEL = 99;
}

// Usage
const hero = Character.createHero("Alice");  // Static method
console.log(hero.attack());                  // Instance method
console.log(hero.isAlive);                   // Getter (no parentheses!)
hero.healthPoints = -50;                     // Setter
console.log(hero.health);                    // 0 (setter prevented negative)
console.log(Character.MAX_LEVEL);            // 99 (static property)

// The Problem: Forgetting new
class Person {
    // constructor runs when you create a new instance
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // method
    greet() {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }

    // another method
    birthday() {
        this.age++;
        return `Happy birthday ${this.name}! Now ${this.age}.`;
    }
}

// creating instances
const alex = new Person("Alex", 25);
const sam = new Person("Sam", 30);

console.log(alex.greet());    // "Hi, I'm Alex and I'm 25 years old."
console.log(sam.birthday());  // "Happy birthday Sam! Now 31."
console.log(alex.age);        // 25 — each instance has its own data





// Private Fields (#) — True Privacy
// ES2020 introduced private fields with the # prefix. Unlike the _underscore 
// convention, these are truly private:

class BankAccount {
  // Private fields — declared with #
  #balance = 0;
  #pin;
  #transactionHistory = [];
  
  constructor(ownerName, initialBalance, pin) {
    this.ownerName = ownerName;  // Public
    this.#balance = initialBalance;
    this.#pin = pin;
  }
  
  // Private method
  #recordTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      balance: this.#balance,
      date: new Date()
    });
  }
  
  // Private method for PIN verification
  #verifyPin(pin) {
    return this.#pin === pin;
  }
  
  // Public methods
  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
    this.#recordTransaction("deposit", amount);
    return this.#balance;
  }
  
  withdraw(amount, pin) {
    if (!this.#verifyPin(pin)) {
      throw new Error("Invalid PIN");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    this.#recordTransaction("withdrawal", amount);
    return this.#balance;
  }
  
  getBalance(pin) {
    if (!this.#verifyPin(pin)) {
      throw new Error("Invalid PIN");
    }
    return this.#balance;
  }
}

const account = new BankAccount("Alice", 1000, "1234");

account.deposit(500);
console.log(account.withdraw(200, "1234"));  // 1300
console.log(account.getBalance("1234"));     // 1300

// Trying to access private fields — ALL FAIL
// account.#balance;           // SyntaxError!
// account.#pin;               // SyntaxError!
// account.#verifyPin("1234"); // SyntaxError!

console.log(account.balance);  // undefined (different property)


// Getters and Setters
// Getters and setters let you define computed properties and add validation:

class Temperature {
  constructor(celsius) {
    this._celsius = celsius;  // Convention: underscore = "private"
  }
  
  // Getter: accessed like a property
  get celsius() {
    return this._celsius;
  }
  
  // Setter: assigned like a property
  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero!");
    }
    this._celsius = value;
  }
  
  // Computed getter: fahrenheit from celsius
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }
  
  // Computed setter: set celsius from fahrenheit
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;  // Uses celsius setter for validation
  }
  
  // Read-only getter (no setter)
  get kelvin() {
    return this._celsius + 273.15;
  }
}

const temp = new Temperature(25);

console.log(temp.celsius);     // 25
console.log(temp.fahrenheit);  // 77
console.log(temp.kelvin);      // 298.15

temp.fahrenheit = 100;         // Set via fahrenheit
console.log(temp.celsius);     // ~37.78 (converted)

// temp.celsius = -300;        // Error: Temperature below absolute zero!
// temp.kelvin = 0;            // Error: no setter (read-only)



// Mistake 1: Forgetting new with Constructor Functions
// ❌ WRONG - Forgot 'new', 'this' becomes global object
function Player(name) {
  this.name = name;
  this.health = 100;
}

const alice = Player("Alice");  // Missing 'new'!

console.log(alice);              // undefined
console.log(globalThis.name);    // "Alice" - leaked to global!
console.log(globalThis.health);  // 100 - also leaked!

// ✓ CORRECT - Always use 'new' with constructors
const bob = new Player("Bob");
console.log(bob.name);           // "Bob"
console.log(bob.health);         // 100



