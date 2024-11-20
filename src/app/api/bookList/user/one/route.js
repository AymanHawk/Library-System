import clientPromise from '../../../../../lib/dbConnection/mongoDB'
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req) {
    try {
        const userId = req.headers.get('userId');
        const list = req.headers.get('reqList');
        const limit = req.headers.get('limit') || 15;
        const page = req.headers.get('page') || 1;


        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        if (!list) {
            return NextResponse.json({ error: 'Missing list' }, { status: 400 });
        }
        const client = await clientPromise;
        const db = client.db('lib');

        const skip = (parseInt(page) -1) *limit;

        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const user = await db.collection('users').findOne({ authId: userId });

        if (!user || !user.bookList[list]) {
            console.log('User not found or book list');
            return NextResponse.json({ error: 'User or bookList not found' }, { status: 404 });
        }

        const booksIds = user.bookList[list].map(bookId => new ObjectId(bookId));

        const totalCount = booksIds.length;

        const books = await db.collection('books')
            .find({ _id: { $in: booksIds } })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

        const bookMap = {}

        books.forEach(book => {
            bookMap[book._id.toString()] = {
                id: book._id,
                imgUrl: book.imgUrl,
                title: book.title,
                author: book.author,
                genre: book.genre[1],
                title: book.title,
            };
        });

        return NextResponse.json({ list: bookMap, totalCount }, { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}