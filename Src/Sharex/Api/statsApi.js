// filesRouter.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Function To Recursively Get All Subdirectories In A Directory
const getDirectories = (directory) => {
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(directory, dirent.name));
};

// Middleware To Fetch All Subdirectories Of '/Uploads'
router.use((req, res, next) => {
  const uploadsDirectory = path.join(__dirname, '../../../Uploads');
  const subdirectories = getDirectories(uploadsDirectory);
  req.directories = subdirectories;
  next();
});

router.get('/info', (req, res) => {
  const fileInfo = [];

  req.directories.forEach(directory => {
    const fullPath = path.join(__dirname, directory);

    try {
      const files = fs.readdirSync(fullPath);
      let totalSize = 0;

      files.forEach(file => {
        const filePath = path.join(fullPath, file);
        const stats = fs.statSync(filePath);

        totalSize += stats.size;
      });

      fileInfo.push({
        directory,
        numberOfFiles: files.length,
        totalSize,
      });
    } catch (error) {
      console.error(`Error Reading Directory ${directory}:`, error.message);
    }
  });

  res.json(fileInfo);
});

module.exports = router;
