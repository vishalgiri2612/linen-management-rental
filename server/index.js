import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';
import bookingRoutes from './routes/booking.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', inventoryRoutes);
app.use('/api/rent', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Linen Management Rental API is running');
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/linen_rental')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

