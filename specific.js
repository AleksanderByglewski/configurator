const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const allowedFiles = new Set();

async function listDirectory(dir) {
  console.log(`\nListing contents of: ${dir}`);
  const items = await fs.readdir(dir);
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
  return items;
}

async function addFileToAllowed(filePath) {
  allowedFiles.add(filePath);
  console.log(`Added to allowed: ${filePath}`);
}

async function promptUserForSelection(dir) {
  const items = await listDirectory(dir);
  rl.question('Select an option (number to choose file/folder, A to add all, Q to quit): ', async (input) => {
    if (input.toUpperCase() === 'Q') {
      rl.close();
      return;
    } else if (input.toUpperCase() === 'A') {
      items.forEach(item => addFileToAllowed(path.join(dir, item)));
      promptUserForSelection(dir); // Prompt again for more actions
    } else {
      const index = parseInt(input) - 1;
      if (index >= 0 && index < items.length) {
        const chosenPath = path.join(dir, items[index]);
        const stats = await fs.stat(chosenPath);
        if (stats.isDirectory()) {
          promptUserForSelection(chosenPath); // Dive into the directory
        } else {
          addFileToAllowed(chosenPath);
          promptUserForSelection(dir); // Prompt again for more actions
        }
      } else {
        console.log('Invalid selection, try again.');
        promptUserForSelection(dir); // Invalid selection, prompt again
      }
    }
  });
}

// Start the interactive selection process from the current directory
promptUserForSelection(process.cwd());