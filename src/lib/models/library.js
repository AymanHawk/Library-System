import mongoose from 'mongoose';

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
    authorizedUsers:{
        type: [String],
        defaylt: []
    }
}, {timeStamps: true})

const Library = mongoose.models.Library || mongoose.model('Library', libSchema);

export default Library;