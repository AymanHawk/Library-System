import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    deliveryDate: {
        type: Date,
        default: Date.now,
    },
    shippingAddress: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: Number }
    },
    orderStatus: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    libId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library',
        required: true,
    },
    orderAt: {
        type: Date,
        default: Date.now,
    },
    fullfilledAt: {
        type: Date,
        default: Date.now,
    },
})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;