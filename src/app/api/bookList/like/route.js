import { connect } from '../../../../lib/dbConnection/mongoose';
import User from '../../../../lib/models/users';

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

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        user.bookList.likedBooks = user.bookList.likedBooks || [];
        user.bookList.dislikedBooks = user.bookList.dislikedBooks || [];

        const listSet = new Set(user.bookList[prefList]);

        if (listSet.has(bookId)) {
            user.bookList[prefList] = user.bookList[prefList].filter(id => id.toString() !== bookId);
        } else {
            for (const list of ['likedBooks', 'dislikedBooks']) {
                user.bookList[list] = user.bookList[list].filter(id => id.toString() !== bookId);
            }
            user.bookList[prefList].push(bookId);
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