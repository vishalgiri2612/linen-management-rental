const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET api/items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/items/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/items (Admin only - just for demo context)
router.post('/', async (req, res) => {
  const { itemName, pricePerWeek, category, imageUrl, description } = req.body;
  try {
    const newItem = new Item({ itemName, pricePerWeek, category, imageUrl, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/items/seed (for easy starting)
router.post('/seed', async (req, res) => {
  const seedItems = [
    { itemName: 'The Classic Single Bed Set', category: 'Bedding', description: 'Fresh, crisp cotton tailored for your modern single bed. A tactile essential.', pricePerWeek: 49, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800' },
    { itemName: 'Signature Double Sheets', category: 'Bedding', description: 'Expansive, luxurious feel with our premium double bed weave. Rest effortlessly.', pricePerWeek: 89, imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800' },
    { itemName: 'Oxford Pillow Slips', category: 'Pillow Covers', description: 'Twin set of finely detailed, breathable cotton pillow covers.', pricePerWeek: 29, imageUrl: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800' },
    { itemName: 'Velvet Throw Pillow Cover', category: 'Pillow Covers', description: 'Deep-pile velvet with a hand-finished edge. Pure editorial comfort.', pricePerWeek: 35, imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800' },
    { itemName: 'Minimalist Sofa Throw', category: 'Sofa Covers', description: 'Drape your living space in structural warmth with our signature throw.', pricePerWeek: 110, imageUrl: 'https://images.unsplash.com/photo-1512331283953-19967202237d?w=800' },
    { itemName: 'Linen Sectional Cover', category: 'Sofa Covers', description: 'Complete coverage in natural, earthy tones for a cohesive aesthetic.', pricePerWeek: 149, imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800' },
    { itemName: 'Essential Package', category: 'Package', description: '2x Fresh Bedsheets, 2x Pillowcases / Month. Sterilized basics.', pricePerWeek: 149, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800' },
    { itemName: 'Comfort Suite Package', category: 'Package', description: '4x Fresh Bedsheets, 4x Pillowcases / Month. The Student Favorite.', pricePerWeek: 249, imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800' },
    { itemName: 'Elite Living Package', category: 'Package', description: '6x Fresh Bedsheets, 6x Pillowcases, 2x Duvet Covers / Month. Luxe Living.', pricePerWeek: 399, imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800' },
  ];

  try {
    await Item.deleteMany();
    await Item.insertMany(seedItems);
    res.json({ message: 'Database seeded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Seed failed' });
  }
});

module.exports = router;
