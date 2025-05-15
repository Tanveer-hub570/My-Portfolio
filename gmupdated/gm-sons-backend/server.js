const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const productRoutes = require('./routes/productRoutes');
const mockProducts = require('./mockData');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// Routes
app.use('/api/products', productRoutes);

// Load mock data into DB if collection is empty
const loadMockData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(mockProducts);
      console.log("✅ Mock products inserted into database.");
    } else {
      console.log("ℹ️ Products already exist. Skipping mock insert.");
    }
  } catch (err) {
    console.error("❌ Error inserting mock products:", err);
  }
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await loadMockData(); // Load mock data once server starts
});
