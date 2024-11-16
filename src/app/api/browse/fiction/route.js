import clientPromise from '../../../../lib/dbConnection/mongoDB'
import { NextResponse } from 'next/server';

export async function GET() {
    try{
        const client = await clientPromise;
        const db = client.db('lib');

        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const dateToday = new Date();
        const month = dateToday.getMonth() + 1;
        const year = dateToday.getFullYear();

        const likedBooks = await db.collection('books').aggregate([
            {
                '$match': {
                    'genre': {
                        '$in': [
                            'fiction'
                        ]
                    }
                }
            },{
                '$sort': {
                    'stats.userLiked': -1
                }
            }, {
                '$project': {
                    '_id': '$_id', 
                    'title': '$title', 
                    'imgUrl': '$imgUrl'
                }
            }, {
                '$limit': 15
            }
        ]).toArray();

        const readBooks = await db.collection('books').aggregate([
            {
                '$match': {
                    'genre': {
                        '$in': [
                            'fiction'
                        ]
                    }
                }
            },{
                '$sort': {
                    'stats.userRead': -1
                }
            }, {
                '$project': {
                    '_id': '$_id', 
                    'title': '$title', 
                    'imgUrl': '$imgUrl'
                }
            }, {
                '$limit': 15
            }
        ]).toArray();

        const rentedBooks = await db.collection('books').aggregate([
            {
                '$match': {
                    'genre': {
                        '$in': [
                            'fiction'
                        ]
                    }
                }
            },{
                '$sort': {
                    'stats.userRented': -1
                }
            }, {
                '$project': {
                    '_id': '$_id', 
                    'title': '$title', 
                    'imgUrl': '$imgUrl'
                }
            }, {
                '$limit': 15
            }
        ]).toArray();

        const books = {
            readBooks,
            likedBooks,
            rentedBooks
        }
        
        return new Response(JSON.stringify(books), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: err.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}