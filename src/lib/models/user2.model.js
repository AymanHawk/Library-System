import mongoose from 'mongoose';
import userPreference from './userPreference.model'; // Adjust the path accordingly


// Define the User schema
const userSchema2 = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
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
  username: {
    type: String,
    required: true,
    unique: true
  },
  profileImage: {
    type: String
  },
  address: {
    type: String
  },
  booksRented: {
    type: [String], // Array of strings for rented books
    default: []
  },
  toReadList: {
    type: [String], // Array of strings for books to read
    default: []
  },
  bookList: {
    type: [String], // Array of strings for user's book collection
    default: []
  },
  userPreferences: [
    {
        type: mongoose.Schema.Types.ObjectId, // You can store mixed data types (as it's a document)
        ref: userPreference
    }
  ],
  comments: {
    type: [String], // Array of strings for user comments
    default: []
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Export the User model
const User2 = mongoose.model('User2', userSchema2);
export default User2;
