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
        recomendation: { type: [String], default: []  },
        toReadList: { type: [String], default: []  },
        rentedBooks: { type: [String], default: []  } ,
        likedBooks: { type: [String], default: []  },
    },
    userPreferences: {
        likedGenre: { type: [String], default: []  },
        likedPace: { type: [String], default: []  },
        likedTheme: { type: [String], default: []  },
        dislikedGenre: { type: [String], default: []  },
        dislikedPace: { type: [String], default: []  },
        dislikedTheme: { type: [String], default: [] },
    },
    stats: {
        totalBooksRead: {type: Number, default: 0 },
        totalBooksRented: {type: Number, default: 0 },
        totalPagesRead: {type: [Number], default: [] },
        trendingBooks: {type: [String], default: 0},
        genresRead: {type: [String], default: [] },
        booksLiked: {type: Number, default: 0 },
        themesRead: {type: [String], default: [] },
        orderCount : {type: Number, default: 0 },
    }
}, {timeStamps: true})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
