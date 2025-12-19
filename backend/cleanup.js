const fs = require('fs');
const path = require('path');

// Files and folders to KEEP
const keepFiles = new Set([
  'server.js',
  'database-config.js',
  'package.json',
  'package-lock.json',
  '.env',
  'node_modules',
  'User.js',
  'Attendance.js',
  'Report.js',
  'cleanup.js'
]);

const dir = __dirname;

fs.readdir(dir, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    if (!keepFiles.has(file)) {
      const filePath = path.join(dir, file);
      fs.rm(filePath, { recursive: true, force: true }, (err) => {
        if (err) console.error(`Failed to delete ${file}: ${err.message}`);
        else console.log(`Deleted: ${file}`);
      });
    } else {
      console.log(`Kept: ${file}`);
    }
  });
});