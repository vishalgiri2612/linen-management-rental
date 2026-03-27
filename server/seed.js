import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './models/Inventory.js';

dotenv.config();

const items = [
  { itemName: 'Premier Cotton Bedsheet Set', pricePerDay: 15, pricePerWeek: 99, category: 'Bedding', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', description: 'Ultra-soft, breathable 100% cotton sheets. Perfect for a cozy hostel stay.', quantity: 50, status: 'available' },
  { itemName: 'Orthopedic Support Pillow', pricePerDay: 8, pricePerWeek: 49, category: 'Comfort', imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=800', description: 'Memory foam pillow designed to provide optimal neck support.', quantity: 30, status: 'available' },
  { itemName: 'Modern Nordic Study Lamp', pricePerDay: 12, pricePerWeek: 79, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800', description: 'Sleek, adjustable LED lamp with multiple brightness levels.', quantity: 25, status: 'available' },
  { itemName: 'Luxury Fleece Blanket', pricePerDay: 20, pricePerWeek: 120, category: 'Bedding', imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', description: 'Thick, warm, and incredibly soft fleece blanket.', quantity: 40, status: 'available' },
  { itemName: 'Ergonomic Desk Chair', pricePerDay: 50, pricePerWeek: 299, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0ad766a61?auto=format&fit=crop&q=80&w=800', description: 'Adjustable backrest and seat height for long study sessions.', quantity: 15, status: 'available' },
  { itemName: 'Premium Laundry Bag', pricePerDay: 6, pricePerWeek: 39, category: 'Personal Care', imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800', description: 'Large capacity, durable laundry bag with easy-carry handles.', quantity: 60, status: 'available' },
  { itemName: 'Shoe Rack (12-pair)', pricePerDay: 13, pricePerWeek: 89, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', description: 'Compact and sturdy rack to keep your footwear organized.', quantity: 20, status: 'available' },
  { itemName: 'Noise-Cancelling Headphones', pricePerDay: 30, pricePerWeek: 199, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', description: 'Focus on your studies with premium noise cancellation technology.', quantity: 10, status: 'available' },
  { itemName: 'Plush Microfiber Towel Set', pricePerDay: 10, pricePerWeek: 69, category: 'Personal Care', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', description: 'Quick-dry and extra absorbent towel set for daily use.', quantity: 45, status: 'available' },
  { itemName: 'Bedside Table Organizer', pricePerDay: 7, pricePerWeek: 45, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=800', description: 'Keep your phone, glasses, and books within reach while you sleep.', quantity: 35, status: 'available' },
  { itemName: 'Folding Laptop Stand', pricePerDay: 9, pricePerWeek: 59, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', description: 'Adjustable height stand for better posture during work.', quantity: 25, status: 'available' },
  { itemName: 'Yoga & Exercise Mat', pricePerDay: 11, pricePerWeek: 75, category: 'Comfort', imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800', description: 'Anti-slip surface for your daily stretching and workout.', quantity: 30, status: 'available' },
  { itemName: 'Blackout Curtains (Set)', pricePerDay: 16, pricePerWeek: 110, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', description: 'Blocks out sunlight for a better daytime rest.', quantity: 20, status: 'available' },
  { itemName: 'Designer Mirror', pricePerDay: 14, pricePerWeek: 95, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800', description: 'Full-length mirror to brighten up your room space.', quantity: 15, status: 'available' },
  { itemName: 'Portable Room Cooler', pricePerDay: 75, pricePerWeek: 499, category: 'Comfort', imageUrl: 'https://images.unsplash.com/photo-1585336139118-2453fd9e2c7a?auto=format&fit=crop&q=80&w=800', description: 'Energy-efficient cooler to keep your room fresh in summers.', quantity: 8, status: 'available' },
  { itemName: 'Dustbin with Pedal', pricePerDay: 4, pricePerWeek: 25, category: 'Hygiene', imageUrl: 'https://images.unsplash.com/photo-1526613098279-e72bbe246e43?auto=format&fit=crop&q=80&w=800', description: 'Hands-free operation for a cleaner dormitory room.', quantity: 50, status: 'available' },
  { itemName: 'Electric Kettle (1.5L)', pricePerDay: 19, pricePerWeek: 130, category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eea50f?auto=format&fit=crop&q=80&w=800', description: 'Quick-boil kettle for tea, coffee, or instant noodles.', quantity: 20, status: 'available' },
  { itemName: 'Under-bed Storage Box', pricePerDay: 10, pricePerWeek: 65, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1591196155605-7f9fe2c0c169?auto=format&fit=crop&q=80&w=800', description: 'Saves space by utilizing the area under your bed frame.', quantity: 30, status: 'available' },
  { itemName: 'Decorative String Lights', pricePerDay: 6, pricePerWeek: 40, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1519750783826-51d01777ed8b?auto=format&fit=crop&q=80&w=800', description: 'Warm fairy lights to create a relaxing evening ambiance.', quantity: 40, status: 'available' },
  { itemName: 'Mattress Protector', pricePerDay: 13, pricePerWeek: 85, category: 'Bedding', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', description: 'Waterproof and hypoallergenic layer for your hostel mattress.', quantity: 25, status: 'available' },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in .env');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Inventory.deleteMany({});
    console.log('Cleared existing inventory...');
    
    await Inventory.insertMany(items);
    console.log('Seeded inventory items successfully!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
