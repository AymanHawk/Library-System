import { NextResponse } from "next/server";
import clientPromise from "../../../lib/dbConnection/mongoDB";
const { ObjectId } = require('mongodb');

export async function GET(req) {
    try {
        const zip = req.headers.get('zips');
        const bookId = req.headers.get('bookId')
        const zipArr = zip.split(',').map((zip) => parseInt(zip.trim(), 10));

        const client = await clientPromise;
        const db = client.db('lib');

        const libs = await db.collection('libraries')
            .find({ 'address.zip': { $in: zipArr }, 'bookStock.bookId': new ObjectId(bookId) })
            .project({_id: 1, name: 1})
            .toArray();

        return NextResponse.json({libs}, {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}