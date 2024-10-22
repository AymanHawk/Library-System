import { connect } from '../../../../lib/dbConnection/mongoose';
import User from '../../../../lib/models/users';

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

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        user.bookList.readBooks = user.bookList.readBooks || [];
        user.bookList.toReadBooks = user.bookList.toReadBooks || [];


        const listSet = new Set(user.bookList[newList]);

        if (listSet.has(bookId)) {
            return new Response(JSON.stringify({ success: true, bookList: user.bookList }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        for (const list of ['readBooks', 'toReadBooks']) {
            user.bookList[list] = user.bookList[list].filter((id) => id.toString() !== bookId);
        }
        user.bookList[newList].push(bookId);
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