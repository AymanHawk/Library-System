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
        bookedRead: {type: Number, default: 0 },
        booksLiked: {type: Number, default: 0 },
        genresRead: {type: [Number], default: [] },
        themeRead: {type: [Number], default: [] },
        paceRead: {type: [Number], default: [] },
        pagesRead: {type: [Number], default: [] },
        booksRented: {type: Number, default: 0 },
        orderCount : {type: Number, default: 0 },
    }
}, {timeStamps: true})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;