const express = require('express');
const router = express.Router();





// Routing

// Upload Router
const uploadRouter = require('./Api/upload');
router.use('/api', uploadRouter);

module.exports = router