import { connect } from '../../../../lib/dbConnection/mongoose';
import User from '../../../../lib/models/users';
import Book from '../../../../lib/models/books'
import { subStat, addStat } from '../../../../lib/actions/book';

export async function POST(req) {

    try {
        await connect();
        const body = await req.json();
        const { userId, bookId, prefList } = body;

        if (!userId || !bookId || !prefList) {
            return new Response(JSON.stringify({ success: false, message: 'Missing data in request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await User.findOne({ authId: userId });
        const book = await Book.findById(bookId);



        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (!book) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const dateToday = new Date();
        const month = dateToday.getMonth() + 1;
        const year = dateToday.getFullYear();

        const statGenre = book.genre.slice(0, 3);
        const statPage = parseInt(book.length.split(' ')[0]) || 0;
        const statTheme = Object.entries(book.reviewData.theme).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([key, value]) => key);
        const statPace = Object.entries(book.reviewData.pace).sort((a,b) => b[1] - a[1]).slice(0, 1).map(([key, value]) => key);

        let statExist = user.stats.monthly.find(entry => entry.year === year && entry.month === month);
        if (!statExist) {
            statExist = {
                year,
                month,
                readBooks: {
                    booksRead: 0,
                    pagesRead: 0,
                    genreRead: [],
                    themeRead: [],
                    paceRead: []
                  },
                  toReadBooks: {
                    booksRead: 0,
                    pagesRead: 0,
                    genreRead: [],
                    themeRead: [],
                    paceRead: [],
                  },
                  likedBooks: {
                    booksRead: 0,
                    pagesRead: 0,
                    genreRead: [],
                    themeRead: [],
                    paceRead: []
                  },
                  rentedBooks: {
                    booksRead: 0,
                    pagesRead: 0,
                    genreRead: [],
                    themeRead: [],
                    paceRead: []
                  },
                  totalOrder: 0
            }
        }

        user.bookList.likedBooks = user.bookList.likedBooks || [];
        user.bookList.dislikedBooks = user.bookList.dislikedBooks || [];


        const listSet = new Set(user.bookList[prefList]);

        if (listSet.has(bookId)) {
            user.bookList[prefList] = user.bookList[prefList].filter(id => id.toString() !== bookId);
            if (prefList === 'likedBooks') {
                subStat(statExist.likedBooks, statGenre, statPace, statTheme, statPage);
            }
        } else {
            for (const list of ['likedBooks', 'dislikedBooks']) {
                user.bookList[list] = user.bookList[list].filter(id => id.toString() !== bookId);
            }
            user.bookList[prefList].push(bookId);
            if (prefList === 'likedBooks') {
                addStat(statExist.likedBooks, statGenre, statPace, statTheme, statPage);
            } else if( prefList === 'dislikedBooks'){
                subStat(statExist.likedBooks, statGenre, statPace, statTheme, statPage);
            }
        }

        if(!user.stats.monthly.find(entry => entry.year === year && entry.month === month)){
            user.stats.monthly.push(statExist);
        }
        await user.save();


        return new Response(JSON.stringify({ success: true, bookList: user.bookList }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}