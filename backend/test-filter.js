const mongoose = require('mongoose');
require('dotenv').config();

async function testFilter() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const Product = mongoose.model('Product', require('./models/Product').schema);

    // Test 1: Xem tất cả categories
    const categories = await Product.distinct('category');
    console.log('\n=== All categories in DB ===');
    console.log(categories);
    console.log('Types:', categories.map(c => typeof c));

    // Test 2: Thử filter với từng category
    for (const cat of categories) {
      const count = await Product.countDocuments({ category: cat });
      console.log(`\nCategory "${cat}" (${typeof cat}): ${count} products`);

      // Thử với regex
      const regexCount = await Product.countDocuments({
        category: { $regex: new RegExp(`^${cat}$`, 'i') }
      });
      console.log(`  Regex case-insensitive: ${regexCount} products`);
    }

    // Test 3: Thử filter với string từ frontend
    const testCategories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
    console.log('\n=== Testing frontend categories ===');
    for (const cat of testCategories) {
      const count = await Product.countDocuments({
        category: { $regex: new RegExp(`^${cat}$`, 'i') }
      });
      console.log(`Category "${cat}": ${count} products`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testFilter();