import clientPromise from "../../../../lib/dbConnection/mongoDB";
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req) {
    try {
        const libId = req.headers.get('libId');
        const limit = req.headers.get('limit') || 15;
        const page = req.headers.get('page') || 1;


        if (!libId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('lib');

        const skip = (parseInt(page) - 1) * limit;

        const library = await db.collection('libraries').findOne({ authId: libId })
        if (!library) {
            return NextResponse.json({ error: 'Library not found' }, { status: 404 });
        }

        const bookIds = library.bookStock.map(book => (book.bookId));

        const totalCount = bookIds.length;

        const books = await db.collection('books')
            .find({ _id: { $in: bookIds } })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();


        const bookMap = books.map(book => {
            const stockEntry = library.bookStock.find(stock => stock.bookId.toString() === book._id.toString());
            return {
                id: book._id.toString(),
                imgUrl: book.imgUrl,
                title: book.title,
                author: book.author,
                genre: book.genre[1],
                amount: stockEntry?.amount || 0,
            }
        })

        return new NextResponse(
            JSON.stringify({ stock: bookMap, totalCount }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { libId, bookId, operation } = body;
        const client = await clientPromise;
        const db = client.db('lib');

        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const library = await db.collection('libraries')
            .findOne({ authId: libId })

        const book = library.bookStock.find(b => b.bookId.toString() === bookId);

        const bookObjectId = new ObjectId(bookId);
        
        if(operation === '+') {
            book.amount = book.amount + 1;
        }else if(operation === '-') {
            book.amount = book.amount - 1;
            if(book.amount < 0) {
                book.amount = 0;
            }
        } else {
            return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
        }

        const stock = book.amount;
        console.log(book);

        const updatedLibrary = await db.collection('libraries').updateOne(
            { authId: libId, "bookStock.bookId": bookObjectId }, 
            { $set: { "bookStock.$.amount": book.amount } }
        );

        if (updatedLibrary.matchedCount === 0) {
            return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 });
        }

        return NextResponse.json({ success: true, stock }, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
