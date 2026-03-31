const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');
const auth = require('../middleware/auth');

// @route   POST api/rent
router.post('/', auth, async (req, res) => {
  const { itemId, startDate, endDate } = req.body;
  try {
    const newRental = new Rental({
      user: req.user.id,
      item: itemId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    await newRental.save();
    res.status(201).json(newRental);
  } catch (err) {
    console.error('❌ POST rentals error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET api/rent/my (For user dashboard)
router.get('/my', auth, async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user.id }).populate('item');
    res.json(rentals);
  } catch (err) {
    console.error('❌ GET my rentals error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET api/rent/all (For admin dashboard)
router.get('/all', auth, async (req, res) => {
  try {
    const rentals = await Rental.find().populate('user item');
    res.json(rentals);
  } catch (err) {
    console.error('❌ GET all rentals error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   PATCH api/rent/status/:id
router.patch('/status/:id', auth, async (req, res) => {
  try {
    const rental = await Rental.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: req.body.status },
      { new: true }
    );
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    res.json(rental);
  } catch (err) {
    console.error('❌ PATCH rental status error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
