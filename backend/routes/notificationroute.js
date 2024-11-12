const express = require('express');
const Notification = require('../models/notificationmodel');
const User = require('../models/usermodel');

const router = express.Router();

// Route to get notifications by user ID
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).send('Server error');
  }
});

// Route to handle payments
router.post('/payments', async (req, res) => {
  const { userId, productId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    user.balance -= amount;
    await user.save();

    // Update the notification to mark it as paid
    const notification = await Notification.findOneAndUpdate(
      { userId, productId },
      { hasPaid: true },
      { new: true }
    );

    res.json({ msg: 'Payment successful! The product will be delivered in the next 7 days.', notification });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
