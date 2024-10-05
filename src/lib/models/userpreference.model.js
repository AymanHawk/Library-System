import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema({
  likedGenre: {
    type: [String], // Array of liked genres
    default: []
  },
  likedPace: {
    type: [String], // Array of liked pace types
    default: []
  },
  likedTheme: {
    type: [String], // Array of liked themes
    default: []
  },
  dislikedGenre: {
    type: [String], // Array of disliked genres
    default: []
  },
  dislikedPace: {
    type: [String], // Array of disliked pace types
    default: []
  },
  dislikedTheme: {
    type: [String], // Array of disliked themes
    default: []
  }
}, { timestamps: true });

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);
export default UserPreference;
