import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bookStock: {
    type: [String], // Array of books available in the library
    default: []
  }
}, { timestamps: true });

const Library = mongoose.model('Library', librarySchema);
export default Library;
