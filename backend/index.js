require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.warn('⚠️ Starting server without DB. Some features may fail.');
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/rent', require('./routes/rentals'));
app.use('/api/support', require('./routes/support'));

// Admin Stats (Placeholder)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const userCount = await require('./models/User').countDocuments();
    const itemCount = await require('./models/Item').countDocuments();
    const rentalCount = await require('./models/Rental').countDocuments();
    res.json({
      subscribers: userCount,
      activeRentals: rentalCount,
      totalItems: itemCount,
      monthlyRevenue: rentalCount * 250 // Hardcoded avg for now
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Basic health check
app.get('/', (req, res) => res.json({ status: 'API is running' }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
