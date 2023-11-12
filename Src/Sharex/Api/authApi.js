const express = require('express');
const router = express.Router();
const config = require('../../../config.json');


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === config.Admin.Username && password === config.Admin.Password) {
    res.json({ success: true, redirect: '/dashboard' });
  } else {
    res.status(401).json({ success: false, message: 'Wrong username or password' });
  }
});

module.exports = router;