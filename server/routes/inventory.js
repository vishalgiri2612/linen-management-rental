import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// GET /items: Fetch available inventory with category filters
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { status: 'available' };

    if (category) {
      filter.category = category;
    }

    const items = await Inventory.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
});

// GET /items/:id: Fetch a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
});

// Admin Route to add inventory items (just for convenience while testing)
router.post('/add', async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Error adding item', error: error.message });
  }
});

export default router;
