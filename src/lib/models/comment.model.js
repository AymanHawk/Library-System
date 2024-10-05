import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: 'User',
    required: true
  },
  ISBN: {
    type: Number, // Reference to the Book model's ISBN
    required: true
  },
  commentID: {
    type: Number,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
