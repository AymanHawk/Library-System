import clientPromise from '../../../../../lib/dbConnection/mongoDB'
import { NextResponse } from 'next/server';
import {allTimePipeline} from './pipeline.js'

export async function GET(req) {
    try {
        const userId = req.headers.get('userId');
        const list = req.headers.get('statList');
        const client = await clientPromise;
        const db = client.db('lib')

        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const pipeline = allTimePipeline(userId, list);
        console.log(userId, list);
        const userAllTimeStat = await db.collection('users').aggregate(pipeline).toArray();

        if (!userAllTimeStat) {
            console.error('User stats not found');
            return NextResponse.json({ error: 'User stats not found' }, { status: 404 });
        }
        return new Response(JSON.stringify(userAllTimeStat), { status: 200 });

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