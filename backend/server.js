const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cron = require('node-cron');
const userRoutes = require('./routes/userroute');
const contactRoutes = require('./routes/contactroute');
const productRoutes = require('./routes/productroute');
const addFundsRoute = require('./routes/addfunds');
const notificationRoutes = require('./routes/notificationroute'); // Import notification routes
const Product = require('./models/productmodel'); // Import the Product model
const User = require('./models/usermodel'); // Import the User model
const Notification = require('./models/notificationmodel'); // Import the Notification model

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', productRoutes);
app.use('/api/users', addFundsRoute);
app.use('/api', notificationRoutes); // Use notification routes

// Serve static files from the "uploads" directory 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Function to check bid deadlines and send notifications
async function checkBidDeadlines() {
  const now = new Date();
  try {
    const products = await Product.find({ deadline: { $lte: now }, notified: { $ne: true } });
    for (const product of products) {
      const user = await User.findById(product.maxBidder);
      if (user) {
        // Create a notification
        const notification = new Notification({
          userId: user._id,
          productId: product._id,
          message: `Congratulations! You have won the bid for ${product.name}. Click the button below to pay.`,
          amount: product.currentBid, // Amount to be paid
        });
        await notification.save();
        // Mark product as notified
        product.notified = true;
        await product.save();
      }
    }
  } catch (error) {
    console.error('Error checking bid deadlines:', error);
  }
}

// Schedule the function to run every minute
cron.schedule('* * * * *', checkBidDeadlines);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});