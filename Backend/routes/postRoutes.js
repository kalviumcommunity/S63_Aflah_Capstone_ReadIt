const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Post = require('../model/post');

//  Create a new Post for a User
router.post('/', async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPost = new Post({ title, content, user: userId });
    const savedPost = await newPost.save();

    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  Get ALL posts (yes, every single one)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get all posts by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get a single post by its ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('user', 'username email');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update a post by its ID
router.put('/:postId', async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
