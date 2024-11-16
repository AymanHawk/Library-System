import { connect } from '../../../lib/dbConnection/mongoose'
import BookReview from '../../../lib/models/bookReview';
import User from '../../../lib/models/users'
import mongoose from 'mongoose';
import Book from '../../../lib/models/books';

export async function POST(req) {
    try {

        await connect();
        const body = await req.json();
        const { title, description, userId, bookId, rating } = body;
        console.log(body);

        if (!userId || !bookId) {
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

        const newReview = await BookReview.create({
            title,
            description,
            rating,
            authorId: user._id,
            bookId,
        });

        return new Response(JSON.stringify({ success: true, review: newReview }), {
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

export async function GET(req) {
    try {

        await connect();
        const bookId = req.headers.get('bookId');
        const limit = req.headers.get('limit') || 5;
        const page = req.headers.get('page') || 1;

        if (!bookId) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const objectId = new mongoose.Types.ObjectId(bookId);

        const skip = (parseInt(page) - 1) * limit;
        
        const book = await Book.findById(bookId);

        const bookTitle = book.title;

        const totalCount = await BookReview.countDocuments({ bookId: objectId });

        const bookReview = await BookReview.find({ bookId: objectId })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('authorId', 'username')

        console.log(bookTitle);
        return new Response(JSON.stringify({ bookReview, totalCount, bookTitle}), {
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