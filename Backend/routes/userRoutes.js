const express = require('express');
const router = express.Router();
const User = require('../model/user');

// GET all users (excluding password)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    const newUser = new User({ username, email, password, avatar });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, avatar },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
