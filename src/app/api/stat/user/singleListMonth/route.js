import clientPromise from '../../../../../lib/dbConnection/mongoDB'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const userId = req.headers.get('userId');
        const list = req.headers.get('statList');
        const month = parseInt(req.headers.get('month'));
        const year = parseInt(req.headers.get('year'));
        const client = await clientPromise;
        const db = client.db('lib')

        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const user = await db.collection('users').findOne({ authId: userId });

        if (!user || !user.stats || !user.stats.monthly) {
            console.error('User or stats not found');
            return NextResponse.json({ error: 'User or stats not found' }, { status: 404 });
        }

        const monthlyStat = user.stats.monthly.find(
            item => item.year === year && item.month === month
          )

        const stat = monthlyStat ? (monthlyStat[list] || []) : [];
        console.log(stat)

        return new Response(JSON.stringify(stat), { status: 200 });

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