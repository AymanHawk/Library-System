import clientPromise from "../../../../lib/dbConnection/mongoDB";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {

        const libId = req.headers.get('libId');
        const limit = parseInt(req.headers.get('limit')) || 25;
        const page = parseInt(req.headers.get('page')) || 1;

        if (!libId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('lib');
        const skip = (page - 1) * limit;


        const members = await db.collection('libraries').aggregate([
            {
                $match: {
                    authId: libId,
                }
            },
            {
                $unwind: "$userAcc"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userAcc",
                    foreignField: "libCards.cardId",
                    as: "member"
                }
            },
            {
                $addFields: {
                    member: {
                        $cond: [
                            { $gt: [{ $size: "$member" }, 0] },
                            { $arrayElemAt: ["$member", 0] },
                            {
                                name: "Not registered",
                                cardId: "$userAcc"
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: "$member._id",
                    name: "$member.name",
                    card: "$userAcc"
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]).toArray();

        const totalCount = members.length;

        return new NextResponse(
            JSON.stringify({ members, totalCount }),
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
        const { libId, op, member } = body;

        const client = await clientPromise;
        const db = client.db('lib');

        const library = await db.collection('libraries').findOne({ authId: libId });

        if (!library) {
            return new Response(JSON.stringify({ success: false, error: 'Library not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let updateOperation = {};
        if (op === '+') {
            updateOperation = { $addToSet: { userAcc: member } };
        } else if (op === '-') {
            updateOperation = { $pull: { userAcc: member } };
        } else {
            return new Response(JSON.stringify({ success: false, error: 'Invalid operation' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await db.collection('libraries').updateOne({ authId: libId }, updateOperation);

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