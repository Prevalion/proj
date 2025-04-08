import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a user name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true, // Ensure email is unique
      lowercase: true, // Store email in lowercase
      match: [ // Basic email format validation
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Do not return password field by default in queries
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// --- Indexes ---
// Index on email for faster lookups and uniqueness enforcement
userSchema.index({ email: 1 });
// Index on isAdmin for potentially filtering admin users
userSchema.index({ isAdmin: 1 });


// --- Middleware ---
// Hash password before saving the user model
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Methods ---
// Instance method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Need to select the password field explicitly if it was excluded in the query
  // This comparison requires the hashed password from the database
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
/* 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 4,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
*/