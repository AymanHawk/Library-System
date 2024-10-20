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
        type: String,
        default: ' '
    },
    bookList: {
        recomendation: { type: [String], default: [] },
        toReadList: { type: [String], default: [] },
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
    stats: {
        monthly: [{
            year: { type: String },
            month: { type: String },
            booksRead: { type: Number, default: 0 },
            booksRented: { type: Number, default: 0 },
            booksLiked: { type: Number, default: 0 },
            pagesRead: { type: Number, default: 0 },
            genreRead: [{
                genre: {type: String},
                count: {type: Number, default: 0}
            }], 
            themeRead: [{
                theme: {type: String},
                count: {type: Number, default: 0}
            }],
            paceRead: [{
                pace: {type: String},
                count: {type: Number, default: 0}
            }]
        }]
    }
}, { timeStamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
