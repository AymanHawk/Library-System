import clientPromise from "../../../lib/dbConnection/mongoDB";
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req) {
    try{
        const userId = req.headers.get('userId');
        console.log(userId)

        const client = await clientPromise;
        const db = client.db('lib');


        const user = await db.collection('users').findOne({ authId: userId });

        const {readBooks = [], recomendation = [], likedBooks = []} = user.bookList;

        const limitedReadBooks = readBooks.slice(0, 4);
        const limitedRecommendation = recomendation.slice(0, 4);
        const limitedLikedBooks = likedBooks.slice(0, 4);

        const booksIds = [...limitedLikedBooks, ...limitedReadBooks, ...limitedRecommendation].map(bookId => new ObjectId(bookId));

        const books = await db.collection('books').find({_id: {$in: booksIds}}).toArray();

        const bookDataMap = {};

        books.forEach(book => {
            bookDataMap[book._id.toString()] = {
                id: book._id,
                imgUrl: book.imgUrl,
            };
        });

        const sendReadBooks = limitedReadBooks.map(bookId => bookDataMap[bookId] || null).filter(Boolean);
        const sendRecommendation = limitedRecommendation.map(bookId => bookDataMap[bookId] || null).filter(Boolean);
        const sendLikedBooks = limitedLikedBooks.map(bookId => bookDataMap[bookId] || null).filter(Boolean);

        return NextResponse.json({
            bookList: {
                readBooks: sendReadBooks,
                recommendBooks: sendRecommendation,
                likedBooks: sendLikedBooks,
            },
        }, {status: 200});


    }catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}