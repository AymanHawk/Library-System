import mongoose from 'mongoose';
import { type } from 'os';

const libSchema = new mongoose.Schema({
    authId: {
        type: String,
        required: true, 
        unique: true,
    },
    email: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: ''
    },
    libImg: {
        type: String,
        default: ''
    },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: Number }
    },
    bookStock: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        amount: {type: Number, default: 0},
        _id: false,
    }],
    members: 
        [{
            userId: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            _id: false,
        }], 
    userAcc: {type: [String], default: []}
}, { timestamps: true }); 

const Library = mongoose.models.Library || mongoose.model('Library', libSchema);

export default Library;
