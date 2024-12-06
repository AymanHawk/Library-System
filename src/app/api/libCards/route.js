
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/dbConnection/mongoDB';

export async function GET(req) {
    try {
        const userId = req.headers.get('userId');
        const client = await clientPromise;
        const db = client.db('lib');

        const user = await db.collection('users').findOne({ authId: userId });

        const userCards = user.libCards
        const libIds = userCards.map(card => card.libId);

        const libs = await db.collection('libraries').find({ _id: { $in: libIds } }).toArray();


        const libMap = {}

        libs.forEach(lib => {
            libMap[lib._id.toString()] = {
                id: lib._id,
                name: lib.name,
                address: lib.address,
            }
        })

        const userLibCards = userCards.map(card => ({
            cardId: card.cardId,
            library: libMap[card.libId.toString()] || null,
        }));

        return new Response(JSON.stringify({ userCards: userLibCards }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
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

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, libId, cardNumber } = body;

        const client = await clientPromise;
        const db = client.db('lib');

        const card = {
            libId: new ObjectId(libId),
            cardId: cardNumber
        }

        const result = await db.collection('users').updateOne(
            { authId: userId },
            { $addToSet: { libCards: card } }
        );
        console.log("Update result:", result);

        return new Response(JSON.stringify({ success: true }), {
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