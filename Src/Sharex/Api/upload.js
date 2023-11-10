const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const randomstring = require('randomstring');

const router = express.Router();

// Load Configuration
const config = require("../../../config.json");
const fileNameLength = config.fileNameLength || 8;

// Define Allowed File Extensions And Their Corresponding Directories
const allowedFileTypes = config.allowedFileTypes

// Set Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = getFileType(file.originalname);
    const uploadDir = `Uploads/${fileType}`;
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const randomStr = randomstring.generate(fileNameLength);
    cb(null, `${randomStr}${path.extname(file.originalname)}`);
  }
});

// File Filter Function
const fileFilter = (req, file, cb) => {
  const fileType = getFileType(file.originalname);
  if (allowedFileTypes[fileType] && allowedFileTypes[fileType].includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Invalid File Type'), false);
  }
};

// Function To Determine File Type Based On Extension
const getFileType = (fileName) => {
  const extname = path.extname(fileName).toLowerCase();
  for (const [type, extensions] of Object.entries(allowedFileTypes)) {
    if (extensions.includes(extname)) {
      return type;
    }
  }
  return 'other';
};

// Initialize Upload
const upload = multer({
  storage: storage,
  limits: config.maxUploadSize,
  fileFilter: fileFilter
}).single('file'); 

router.use('/uploads', express.static('uploads'));

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    
    // File Uploaded Successfully
    const filePath = req.file.path;
    res.status(200).json({ success: true, filePath });
  });
});

module.exports = router;
