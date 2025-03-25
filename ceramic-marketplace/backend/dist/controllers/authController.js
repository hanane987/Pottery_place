const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role
  } = req.body;
  try {
    const existingUser = await User.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Error registering user',
      error: error.message
    });
  }
};
const loginUser = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await User.findOne({
      email
    });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({
      token,
      role: user.role
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      message: 'Error logging in',
      error: error.message
    });
  }
};
const logoutUser = (req, res) => {
  res.status(200).json({
    message: 'User logged out successfully'
  });
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser
};