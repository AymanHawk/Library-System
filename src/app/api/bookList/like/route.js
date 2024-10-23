import { connect } from '../../../../lib/dbConnection/mongoose';
import User from '../../../../lib/models/users';
import Book from '../../../../lib/models/books'

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
        const statPage = book.length.split(' ')[0] || 0;
        const statTheme = Object.entries(book.reviewData.theme).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([key, value]) => key);
        const statPace = Object.entries(book.reviewData.pace).slice(0, 1).map(([key, value]) => key);

        let statExist = user.stats.monthly.find(entry => entry.year === year && entry.month === month);
        if (!statExist) {
            statExist = {
                year,
                month,
                likedBooks: {
                    genreRead: [],
                    themeRead: [],
                    paceRead: [],
                    pagesRead: 0,
                    booksRead: 0,
                },
            }
            user.stats.monthly.push(statExist);
        }

        user.bookList.likedBooks = user.bookList.likedBooks || [];
        user.bookList.dislikedBooks = user.bookList.dislikedBooks || [];


        const listSet = new Set(user.bookList[prefList]);
        console.log(user.bookList[prefList]);
        console.log(listSet);
        const subStat = () => {
            statGenre.forEach(genre => {
                const userGenStat = statExist.likedBooks.genreRead.find(g => g.genre === genre);
                if (userGenStat) {
                    userGenStat.count -= 1;
                    if (userGenStat.count <= 0) {
                        userGenStat.count = 0;
                    }
                } else {
                    statExist.likedBooks.genreRead.push({ genre, count: 0 });
                }
            })
            statTheme.forEach(theme => {
                const userThemeStat = statExist.likedBooks.themeRead.find(t => t.theme === theme);
                if (userThemeStat) {
                    userThemeStat.count -= 1;
                    if (userThemeStat.count <= 0) {
                        userThemeStat.count = 0;
                    }
                } else {
                    statExist.likedBooks.themeRead.push({ theme, count: 0 });
                }
            })
            statPace.forEach(pace => {
                const userPaceStat = statExist.likedBooks.paceRead.find(p => p.pace === pace);
                if (userPaceStat) {
                    userPaceStat.count -= 1;
                    if (userPaceStat.count <= 0) {
                        userPaceStat.count = 0;
                    }
                } else {
                    statExist.likedBooks.paceRead.push({ pace, count: 0 });
                }
            })
            statExist.likedBooks.pagesRead = (statExist.likedBooks.pagesRead || 0) - statPage;
            if (statExist.likedBooks.pagesRead < 0) {
                statExist.likedBooks.pagesRead = 0;
            }
            statExist.likedBooks.booksRead = (statExist.likedBooks.booksRead || 0) - 1;
            if (statExist.likedBooks.booksRead < 0) {
                statExist.likedBooks.booksRead = 0;
            }
        }

        const addStat = () => {
            statGenre.forEach(genre => {
                const userGenStat = statExist.likedBooks.genreRead.find(g => g.genre === genre);
                if (userGenStat) {
                    userGenStat.count += 1;
                } else {
                    statExist.likedBooks.genreRead.push({ genre, count: 1 });
                }
            })
            statTheme.forEach(theme => {
                const userThemeStat = statExist.likedBooks.themeRead.find(t => t.theme === theme);
                if (userThemeStat) {
                    userThemeStat.count += 1;
                } else {
                    statExist.likedBooks.themeRead.push({ theme, count: 1 });
                }
            })
            statPace.forEach(pace => {
                const userPaceStat = statExist.likedBooks.paceRead.find(p => p.pace === pace);
                if (userPaceStat) {
                    userPaceStat.count += 1;
                } else {
                    statExist.likedBooks.paceRead.push({ pace, count: 1 });
                }
            })
            statExist.likedBooks.pagesRead = (statExist.likedBooks.pagesRead || 0) + statPage;
            statExist.likedBooks.booksRead = (statExist.likedBooks.booksRead || 0) + 1;
        }

        if (listSet.has(bookId)) {
            user.bookList[prefList] = user.bookList[prefList].filter(id => id.toString() !== bookId);
            if (prefList === 'likedBooks') {
                subStat();
            }
        } else {
            for (const list of ['likedBooks', 'dislikedBooks']) {
                user.bookList[list] = user.bookList[list].filter(id => id.toString() !== bookId);
                if (prefList === 'likedBooks') {
                    subStat();
                }
            }
            user.bookList[prefList].push(bookId);
            if (prefList === 'likedBooks') {
                addStat();
            } else if( prefList === 'dislikedBooks'){
                subStat();
            }
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