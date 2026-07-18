const fs = require('fs').promises; // Using promise-based async FS methods
const path = require('path');
const folderMapping = require('./config');

async function organizeDirectory(targetDir) {
  try {
    // 1. Read all files inside the target directory (Non-blocking)
    const items = await fs.readdir(targetDir, { withFileTypes: true });
    
    let movedCount = 0;

    for (const item of items) {
      // Skip directories; we only want to organize individual files
      if (!item.isFile()) continue;

      const fileName = item.name;
      const ext = path.extname(fileName).toLowerCase();
      
      // 2. Find the correct matching folder category
      let targetFolder = 'Others'; // Default fallback folder
      for (const [folderName, extensions] of Object.entries(folderMapping)) {
        if (extensions.includes(ext)) {
          targetFolder = folderName;
          break;
        }
      }

      // 3. Construct source and destination system paths
      const sourcePath = path.join(targetDir, fileName);
      const destDir = path.join(targetDir, targetFolder);
      const destPath = path.join(destDir, fileName);

      // 4. Ensure the category folder exists safely, then move the file
      await fs.mkdir(destDir, { recursive: true });
      await fs.rename(sourcePath, destPath);
      
      console.log(`Sorted: ${fileName} -> ${targetFolder}/`);
      movedCount++;
    }

    console.log(`\nSuccess! Cleaned up ${movedCount} files.`);
  } catch (error) {
    console.error(`Error organizing directory: ${error.message}`);
  }
}

module.exports = organizeDirectory;