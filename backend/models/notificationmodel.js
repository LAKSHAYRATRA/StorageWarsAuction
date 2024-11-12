const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  hasPaid: { // Field to track if the user has paid
    type: Boolean,
    default: false,
  },
  amount: { // Field to store the amount to be paid
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);