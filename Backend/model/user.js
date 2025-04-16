const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    url: String,
    public_id: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
