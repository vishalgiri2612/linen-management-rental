import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  depositStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'pending' },
  bookingStatus: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
