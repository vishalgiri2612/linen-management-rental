import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }, // Bedding, Electronics, etc.
  pricePerDay: { type: Number, required: true },
  pricePerWeek: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['available', 'maintenance', 'out_of_stock'], default: 'available' },
  imageUrl: { type: String }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;

