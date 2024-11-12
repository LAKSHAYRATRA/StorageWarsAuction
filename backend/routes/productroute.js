const express = require('express');
const multer = require('multer');
const Product = require('../models/productmodel');
const User = require('../models/usermodel');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to create a new product
router.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, startingBid, deadline,listedBy } = req.body;
  const imagePath = req.file.path; // Path of the uploaded image

  try {
    const newProduct = new Product({
      name,
      description,
      startingBid,
      currentBid: startingBid, // Initialize currentBid with startingBid
      deadline,
      image: imagePath,
      listedBy,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Server error');
  }
});

// Route to get all products
// Route to get all products not listed by a specific user
router.get('/products', async (req, res) => {
    const userId = req.query.userId; // Receiving userId from the query parameters
  
    try {
      const products = await Product.find({ listedBy: { $ne: userId } }).populate('maxBidder', 'name email'); // Populating the maxBidder field to get user details
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Server error');
    }
  });
  

// Route to handle bidding on a product
router.post('/products/:id/bid', async (req, res) => {
  const { id } = req.params;
  const { bidAmount, userId } = req.body; // Receiving userId from the frontend

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if the new bid is higher than the current bid
    if (bidAmount > product.currentBid) {
      product.currentBid = bidAmount;
      product.maxBidder = userId; // Store the ID of the user who placed the max bid
      await product.save();
      res.json({ msg: 'Bid placed successfully', product });
    } else {
      res.status(400).json({ msg: 'Bid must be higher than the current bid' });
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;