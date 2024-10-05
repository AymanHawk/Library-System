import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderID: {
    type: Number,
    required: true,
    unique: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: 'User',
    required: true
  },
  bookID: {
    type: [Number], // Array of Book ISBNs
    required: true
  },
  libID: {
    type: [Number], // Array of Library IDs
    required: true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
