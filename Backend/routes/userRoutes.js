// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Post = require('../model/post');

// Create a new User
router.post('/', async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    const newUser = new User({
      username,
      email,
      password,
      avatar,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (excluding passwords)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single user by ID with populated posts
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('posts').select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, avatar },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
