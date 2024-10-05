import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: Number,
    required: true,
    unique: true
  },
  length: {
    type: Number, // Length of the book (pages, etc.)
    required: true
  },
  publishYear: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  bookPic: {
    type: String // Image URL or path
  },
  reviewData: {
    type: [{
      theme: String,
      pace: String
    }], // Array of objects holding theme and pace
    default: []
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
