const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const dotenv = require('dotenv');

// Ensure environment variables are loaded
dotenv.config();

// Debug: Log environment variables
console.log('\n=== Auth Routes Environment Check ===');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('================================\n');

// Get JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET loaded:', JWT_SECRET ? '✅' : '❌');
console.log('JWT_SECRET length:', JWT_SECRET ? JWT_SECRET.length : 0);

// Middleware to check JWT_SECRET
const checkJwtSecret = (req, res, next) => {
  console.log('Checking JWT_SECRET...');
  if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET is not defined in environment variables');
    return res.status(500).json({ 
      message: 'Server configuration error',
      details: 'JWT_SECRET is not properly configured'
    });
  }
  console.log('✅ JWT_SECRET check passed');
  next();
};

// === REGISTER ===
router.post('/register', checkJwtSecret, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('\n=== Registration Attempt ===');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password provided:', password ? 'Yes' : 'No');

    // Validate input
    if (!username || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    console.log('🔍 Checking for existing user...');
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        console.log('❌ Email already exists:', email);
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (existingUser.username === username.toLowerCase()) {
        console.log('❌ Username already exists:', username);
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // Hash password
    console.log('🔒 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log('👤 Creating new user...');
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword
    });

    console.log('✅ User created successfully:', { 
      id: user._id, 
      username: user.username, 
      email: user.email 
    });

    // Sign JWT
    console.log('🎟️ Generating JWT token...');
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3d' });
    console.log('✅ Token generated successfully');

    // Send response
    console.log('📤 Sending successful response');
    res.status(201).json({
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
    console.log('=== Registration Process Complete ===\n');

  } catch (err) {
    console.error('\n❌ Registration error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    console.error('Error stack:', err.stack);

    // Handle specific MongoDB errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }

    res.status(500).json({
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// === LOGIN ===
router.post('/login', checkJwtSecret, async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('\n=== Login Attempt ===');
    console.log('Email:', email);
    console.log('Password provided:', password ? 'Yes' : 'No');

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    console.log('🔍 Looking up user...');
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('✅ User found:', { id: user._id, email: user.email });

    // Compare password
    console.log('🔑 Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch ? '✅' : '❌');

    if (!isMatch) {
      console.log('❌ Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    console.log('🎟️ Generating JWT token...');
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3d' });
    console.log('✅ Token generated successfully');

    // Send response
    console.log('📤 Sending successful response');
    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
    console.log('=== Login Process Complete ===\n');

  } catch (err) {
    console.error('\n❌ Login error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    
    res.status(500).json({
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;
