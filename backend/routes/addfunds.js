const express = require('express');
const router = express.Router();
const User = require('../models/usermodel'); // Check the file name and path

// Route to handle adding funds
router.patch('/:userId/addFunds', async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: 'User ID and amount are required' });
    }

    console.log(`userId: ${userId}, amount: ${amount}`);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate and update the user's balance
    user.currentBalance = user.currentBalance || 0;
    user.currentBalance += Number(amount);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error adding funds:', error);
    res.status(500).json({ message: 'Error adding funds', error });
  }
});

module.exports = router;
