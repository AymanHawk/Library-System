import clientPromise from '../../../../../lib/dbConnection/mongoDB'
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        if (!userId) {
            console.log('Missing userId');
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }


        const client = await clientPromise;
        const db = client.db('lib');

        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
          }

        const user = await db.collection('users').findOne({ authId: userId });

        if(!user || !user.bookList) {
            console.log('User not found or book list');
            return NextResponse.json({ error: 'User or bookList not found' }, { status: 404 });
        }

        const {readBooks = [], toReadBooks = [], likedBooks = []} = user.bookList;
        const limitedReadBooks = readBooks.slice(0, 15);
        const limitedToReadBooks = toReadBooks.slice(0, 15);
        const limitedLikedBooks = likedBooks.slice(0, 15);

        

        const booksIds = [...limitedReadBooks, ...limitedToReadBooks, ...limitedLikedBooks].map(bookId => new ObjectId(bookId));

        const books = await db.collection('books').find({_id: {$in: booksIds}}).toArray();

        const bookDataMap = {};

        books.forEach(book => {
            bookDataMap[book._id.toString()] = {
                id: book._id,
                imgUrl: book.imgUrl,
            };
        });

        const sendReadBooks = limitedReadBooks.map(bookId => bookDataMap[bookId] || null).filter(Boolean);
        const sendToReadBooks = limitedToReadBooks.map(bookId => bookDataMap[bookId] || null).filter(Boolean);
        const sendLikedBooks = limitedLikedBooks.map(bookId => bookDataMap[bookId] || null).filter(Boolean);

        return NextResponse.json({
            bookList: {
                readBooks: sendReadBooks,
                toReadBooks: sendToReadBooks,
                likedBooks: sendLikedBooks,
            },
        }, {status: 200});

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}