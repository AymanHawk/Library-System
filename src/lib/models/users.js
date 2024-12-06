import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
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
    username: {
        type: String,
        default: ' '
    },
    profileImg: {
        type: String,
        default: ' '
    },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: Number }
    },
    bookList: {
        recomendation: { type: [String], default: [] },
        toReadBooks: { type: [String], default: [] },
        readBooks: { type: [String], default: [] },
        rentedBooks: { type: [String], default: [] },
        likedBooks: { type: [String], default: [] },
        dislikedBooks: { type: [String], default: [] },
    },
    userPreferences: {
        likedGenre: { type: [String], default: [] },
        likedPace: { type: [String], default: [] },
        likedTheme: { type: [String], default: [] },
        dislikedGenre: { type: [String], default: [] },
        dislikedPace: { type: [String], default: [] },
        dislikedTheme: { type: [String], default: [] },
    },
    cart: [{
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
    }],
    libCards: [{
        libId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Library',
            required: true,
        },
        cardId: { type: String }
    }],
    stats: {
        monthly: [{
            year: { type: Number },
            month: { type: Number },
            readBooks: {
                booksRead: { type: Number, default: 0 },
                pagesRead: { type: Number, default: 0 },
                genreRead: [{
                    genre: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                themeRead: [{
                    theme: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                paceRead: [{
                    pace: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }]
            },
            toReadBooks: {
                booksRead: { type: Number, default: 0 },
                pagesRead: { type: Number, default: 0 },
                genreRead: [{
                    genre: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                themeRead: [{
                    theme: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                paceRead: [{
                    pace: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }]
            },
            likedBooks: {
                booksRead: { type: Number, default: 0 },
                pagesRead: { type: Number, default: 0 },
                genreRead: [{
                    genre: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                themeRead: [{
                    theme: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                paceRead: [{
                    pace: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }]
            },
            rentedBooks: {
                booksRead: { type: Number, default: 0 },
                pagesRead: { type: Number, default: 0 },
                genreRead: [{
                    genre: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                themeRead: [{
                    theme: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }],
                paceRead: [{
                    pace: { type: String },
                    count: { type: Number, default: 0 },
                    _id: false
                }]
            },
            totalOrder: { type: Number, default: 0 },
            _id: false
        }]
    }
}, { timeStamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
