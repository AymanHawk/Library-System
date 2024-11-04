import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, { _id: false }); // Prevents creation of an _id for each member

const libSchema = new mongoose.Schema({
    authId: {
        type: String,
        required: true, 
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: ' '
    },
    profileImg: {
        type: String,
        default: ' '
    },
    address: {
        type: String,
        default: ' '
    },
    bookStock: {
        type: String, 
        default: null
    },
    members: {
        type: [memberSchema], 
        default: []
    }
}, { timestamps: true }); 

const Library = mongoose.models.Library || mongoose.model('Library', libSchema);

export default Library;
