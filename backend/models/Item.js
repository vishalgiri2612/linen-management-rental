const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  pricePerWeek: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String },
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
