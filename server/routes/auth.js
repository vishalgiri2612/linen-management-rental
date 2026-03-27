import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, hostelId, roomNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      hostelId,
      roomNumber
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_default_secret_key', { expiresIn: '7d' });

    res.status(201).json({ user: { id: user._id, name, email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_default_secret_key', { expiresIn: '7d' });

    res.status(200).json({ user: { id: user._id, name: user.name, email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

export default router;
