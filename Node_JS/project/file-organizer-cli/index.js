const path = require('path');
const organizeDirectory = require('./organizer');


// Extract arguments from CLI input: node app.js <directory-path>
const args = process.argv.slice(2);
const targetPath = args[0];

if (!targetPath) {
  console.log('Error: Please specify a target directory path.');
  console.log('Usage: node app.js <path-to-folder>');
  process.exit(1);
}

// Resolve relative paths (like './downloads') into absolute system paths
const absoluteTargetDir = path.resolve(targetPath);

console.log(`Initializing cleanup for: ${absoluteTargetDir}\n`);

// Run the asynchronous organizer logic
organizeDirectory(absoluteTargetDir);