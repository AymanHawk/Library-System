import { connect } from '../../../../lib/dbConnection/mongoose';
import Book from '../../../../lib/models/books';
import User from '../../../../lib/models/users';
import { subStat, addStat } from '../../../../lib/actions/book';

export async function GET(req) {
    try {
        await connect();
        const userId = req.nextUrl.searchParams.get('userId');
        const user = await User.findOne({ authId: userId }).select('bookList');

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(user.bookList), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { userId, bookId, newList } = body;

        if (!userId || !bookId || !newList) {
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
        const month = dateToday.getMonth()+1;
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

        user.bookList.readBooks = user.bookList.readBooks || [];
        user.bookList.toReadBooks = user.bookList.toReadBooks || [];


        const listSet = new Set(user.bookList[newList]);

        if (listSet.has(bookId)) {
            return new Response(JSON.stringify({ success: true, bookList: user.bookList }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            if (newList === 'readBooks'){
                if(user.bookList.toReadBooks.includes(bookId)){
                    user.bookList.toReadBooks = user.bookList.toReadBooks.filter((id) => id.toString() !== bookId);
                    subStat(statExist.toReadBooks, statGenre, statPace, statTheme, statPage);
                }
            } else if(newList === 'toReadBooks') {
                if(user.bookList.readBooks.includes(bookId)){
                    user.bookList.readBooks = user.bookList.readBooks.filter((id) => id.toString() !== bookId);
                    subStat(statExist.readBooks, statGenre, statPace, statTheme, statPage);
                }
            } else if (newList === 'remove') {
                for (const list of ['readBooks', 'toReadBooks']) {
                    if(user.bookList[list].includes(bookId)){
                        user.bookList[list] = user.bookList[list].filter((id) => id.toString() !== bookId);
                        subStat(statExist[list], statGenre, statPace, statTheme, statPage);
                    }
                }
            } else {
                return new Response(JSON.stringify({ success: false, message: 'No list inserted' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        if(newList!=='remove'){
            user.bookList[newList].push(bookId);
            addStat(statExist[newList], statGenre, statPace, statTheme, statPage);
        }

        if(!user.stats.monthly.find(entry => entry.year === year && entry.month === month)){
            user.stats.monthly.push(statExist);
        }

        await user.save();

        return new Response(JSON.stringify({ success: true, bookList: user.bookList }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}