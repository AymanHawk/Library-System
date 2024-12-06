import { NextResponse } from "next/server";
import clientPromise from "../../../lib/dbConnection/mongoDB";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db('lib');

        const libs = await db.collection('libraries')
            .find({}, { projection: { _id: 1, name: 1 } })
            .toArray();

        console.log(libs);

        return NextResponse.json({ libs }, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}