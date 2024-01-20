const fs = require('fs').promises;
const path = require('path');

async function writeContentsToFile(outputFilePath, filePath, fileData) {
  await fs.appendFile(outputFilePath, `--FILE ${filePath}\n${fileData}\n\n`);
}

async function readIgnorePatterns(ignoreFilePath) {
  try {
    const data = await fs.readFile(ignoreFilePath, 'utf8');
    return data.split(/\r?\n/).filter(line => line.trim() !== '' && !line.startsWith('#'));
  } catch (error) {
    // If .u24ignore doesn't exist, return an empty array (nothing to ignore)
    return [];
  }
}

function matchPattern(str, pattern) {
  // Exact match or wildcard match:
  // The current implementation supports exact match and simple wildcard (*) at the start or end of the pattern.
  if (pattern === str || pattern === '*') {
    return true;
  }
  if (pattern.startsWith('*') && str.endsWith(pattern.slice(1))) {
    return true;
  }
  if (pattern.endsWith('*') && str.startsWith(pattern.slice(0, -1))) {
    return true;
  }
  return false;
}

function shouldIgnore(itemPath, ignorePatterns) {
  // Paths should be standardized to Unix-style for consistency
  const standardizedPath = itemPath.split(path.sep).join('/');

  // Check if the file should be ignored by iterating through the ignore patterns
  for (const pattern of ignorePatterns) {
    const standardizedPattern = pattern.split(path.sep).join('/');
    if (standardizedPattern.endsWith('/')) {
      // If the pattern ends with '/', it signifies a directory.
      // We must ignore everything inside this directory.
      if (standardizedPath.startsWith(standardizedPattern)) {
        return true;
      }
    } else {
      // Exact match or match ignoring leading directories (to handle patterns like .git)
      if (standardizedPath === standardizedPattern || standardizedPath.endsWith('/' + standardizedPattern)) {
        return true;
      }
    }
  }

  return false;
}

async function traverseDirectoryBFS(startingDirectory, outputFilePath, ignoreFilePath) {
  
  const ignorePatterns = await readIgnorePatterns(ignoreFilePath);
  let queue = [{ dir: startingDirectory, path: '' }];

  while (queue.length > 0) {
    const { dir, path: parentPath } = queue.shift();
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(startingDirectory, fullPath);

      if (shouldIgnore(relativePath, ignorePatterns)) {
        continue; // Ignore this file or directory
      }

      const stats = await fs.stat(fullPath);
      if (stats.isDirectory()) {
        queue.push({ dir: fullPath, path: relativePath });
      } else {
        const fileData = await fs.readFile(fullPath, 'utf8');
        await writeContentsToFile(outputFilePath, relativePath, fileData);
      }
    }
  }
}

let  startingDirectory = process.cwd();
const u24contentDirectory = path.join(startingDirectory, 'u24context');
const outputFilePath = path.join(u24contentDirectory, 'context.txt');
const ignoreFilePath = path.join(u24contentDirectory, '.u24ignore'); // .u24ignore should be in the 'u24context' directory
// startingDirectory  = path.dirname(startingDirectory); // Going a level up as we assume the script is in 'u24context' directory

fs.writeFile(outputFilePath, '');

traverseDirectoryBFS(startingDirectory, outputFilePath, ignoreFilePath).then(() => {
  console.log('BFS traversal and file content output complete.');
}).catch(error => {
  console.error('An error occurred during BFS traversal:', error);
});