import express from 'express';
import Booking from '../models/Booking.js';
import Inventory from '../models/Inventory.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /: Logic to handle rental requests
router.post('/', auth, async (req, res) => {

  try {
    const { itemId, startDate, endDate } = req.body;
    const userId = req.user.id; // From auth middleware

    // Get item details
    const item = await Inventory.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.quantity <= 0 || item.status !== 'available') {
      return res.status(400).json({ message: 'Item is out of stock or unavailable' });
    }

    // Calculate rental cost
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff <= 0) {
      return res.status(400).json({ message: 'Invalid rental period (End date must be after Start date)' });
    }

    // Cost logic based on daily and weekly prices
    const weeks = Math.floor(daysDiff / 7);
    const remainingDays = daysDiff % 7;
    const totalCost = (weeks * item.pricePerWeek) + (remainingDays * item.pricePerDay);

    // Create the booking
    const booking = new Booking({
      userId,
      itemId,
      startDate: start,
      endDate: end,
      totalCost,
      bookingStatus: 'active'
    });

    await booking.save();

    // Decrement item quantity (In a production app, use transactions or atomic updates)
    item.quantity -= 1;
    if (item.quantity === 0) {
      item.status = 'out_of_stock';
    }
    await item.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(400).json({ message: 'Error creating rental', error: error.message });
  }
});

// GET /my-rentals: Fetch current active rentals for the logged-in student
router.get('/my-rentals', auth, async (req, res) => {
  try {
    const rentals = await Booking.find({ userId: req.user.id, bookingStatus: 'active' })
      .populate('itemId', 'itemName description imageUrl');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rentals', error: error.message });
  }
});

export default router;
