const fs = require('fs').promises;
const path = require('path');
const folderMapping = require('./config');

async function organizeDirectory(targetDir) {
  try {
    // Check if the path is a file or directory first
    const stats = await fs.stat(targetDir);
    
    if (stats.isFile()) {
      console.error(`Error: "${targetDir}" is a file. Please provide a path to a folder instead.`);
      return;
    }

    const items = await fs.readdir(targetDir, { withFileTypes: true });
    let movedCount = 0;

    for (const item of items) {
      if (!item.isFile()) continue;

      const fileName = item.name;
      const ext = path.extname(fileName).toLowerCase();
      
      let targetFolder = 'Others';
      for (const [folderName, extensions] of Object.entries(folderMapping)) {
        console.log("folder name: ",folderName," extensions : ",extensions);
        if (extensions.includes(ext)) {
          targetFolder = folderName;
          console.log("target folder : ",targetFolder);
          break;
        }
      }

      const sourcePath = path.join(targetDir, fileName);
      console.log("source path : ",sourcePath);
      const destDir = path.join(targetDir, targetFolder);
      console.log("destination directory : ",destDir);
      const destPath = path.join(destDir, fileName);
      console.log("destination path : ",destPath);

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