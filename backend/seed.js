require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Item = require('./models/Item');
const Rental = require('./models/Rental');

const seedData = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // 2. Clear existing data
    await User.deleteMany();
    await Item.deleteMany();
    await Rental.deleteMany();
    console.log('🧹 Cleared existing data.');

    // 3. Create Admin & Student Users
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User({
      name: 'Vishal Admin',
      email: 'admin@closetrush.com',
      password: hashedPassword,
      isAdmin: true
    });

    const studentUser = new User({
      name: 'John Doe',
      email: 'student@closetrush.com',
      password: hashedPassword,
      isAdmin: false
    });

    await adminUser.save();
    await studentUser.save();
    console.log('👤 Created Mock Users (Email: admin@closetrush.com, Password: admin123)');

    // 4. Create Mock Items (Product Catalog)
    const items = [
      {
        itemName: 'The Classic Single Bed Set',
        category: 'Bedding',
        description: 'Fresh, crisp cotton tailored for your modern single bed. A tactile essential.',
        pricePerWeek: 49,
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
      },
      {
        itemName: 'Signature Double Sheets',
        category: 'Bedding',
        description: 'Expansive, luxurious feel with our premium double bed weave. Rest effortlessly.',
        pricePerWeek: 89,
        imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800'
      },
      {
        itemName: 'Oxford Pillow Slips',
        category: 'Pillow Covers',
        description: 'Twin set of finely detailed, breathable cotton pillow covers.',
        pricePerWeek: 29,
        imageUrl: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800'
      },
      {
        itemName: 'Velvet Throw Pillow Cover',
        category: 'Pillow Covers',
        description: 'Deep-pile velvet with a hand-finished edge. Pure editorial comfort.',
        pricePerWeek: 35,
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800'
      },
      {
        itemName: 'Minimalist Sofa Throw',
        category: 'Sofa Covers',
        description: 'Drape your living space in structural warmth with our signature throw.',
        pricePerWeek: 110,
        imageUrl: 'https://images.unsplash.com/photo-1512331283953-19967202237d?w=800'
      },
      {
        itemName: 'Linen Sectional Cover',
        category: 'Sofa Covers',
        description: 'Complete coverage in natural, earthy tones for a cohesive aesthetic.',
        pricePerWeek: 149,
        imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800'
      }
    ];

    const insertedItems = await Item.insertMany(items);
    console.log('📦 Created Mock Items.');

    // 5. Create a Mock Rental for the student
    const rental = new Rental({
      user: studentUser._id,
      item: insertedItems[0]._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      status: 'active'
    });

    await rental.save();
    console.log('📅 Created a Mock Rental record.');

    console.log('✨ Seeding complete! Database is ready.');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
