import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    length: {
        type: String
    },
    genre: {
        type: [String]
    },
    description: {
        type: String
    },
    reviewData: {
        theme: {
            adventurous: { type: Number, default: 0 },
            challenging: { type: Number, default: 0 },
            dark: { type: Number, default: 0 },
            emotional: { type: Number, default: 0 },
            funny: { type: Number, default: 0 },
            hopeful: { type: Number, default: 0 },
            informative: { type: Number, default: 0 },
            inspiring: { type: Number, default: 0 },
            lighthearted: { type: Number, default: 0 },
            mysterious: { type: Number, default: 0 },
            reflective: { type: Number, default: 0 },
            relaxing: { type: Number, default: 0 },
            sad: { type: Number, default: 0 },
            tense: { type: Number, default: 0 }
        },
        pace: {
            fast: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            low: { type: Number, default: 0 }
        }
    },
    publishDate: {
        type: Date
    },
    imgUrl: {
        type: String
    },
    isbn: {
        type: Number
    },
    publishName: {
        type: String
    },
    format: {
        type: String
    },
    language: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    stats: {
        monthly: [{
            year: { type: Number },
            month: { type: Number },
            userRead: { type: Number, default: 0 },
            userLiked: { type: Number, default: 0 },
            userRented: { type: Number, default: 0 }
        }]
    }
})

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;