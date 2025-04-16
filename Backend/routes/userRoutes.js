const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude password
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;
