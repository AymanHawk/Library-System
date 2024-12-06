import clientPromise from "../../../lib/dbConnection/mongoDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
    try {

        const orderId = req.headers.get('orderId');

        if (!orderId) {
            return new Response(JSON.stringify({ success: false, message: 'Missing data in request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('lib');

        const order = await db.collection('orders').aggregate(
            [
                {
                    $match: {
                        _id: new ObjectId(orderId),
                    }
                },
                {
                    $unwind: "$bookIds"
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "bookIds",
                        foreignField: "_id",
                        as: "bookDetails"
                    }
                },
                {
                    $unwind: "$bookDetails"
                },
                {
                    $group: {
                        _id: "$_id",
                        deliveryDate: {
                            $first: "$deliveryDate"
                        },
                        shippingAddress: {
                            $first: "$shippingAddress"
                        },
                        userId: {
                            $first: "$userId"
                        },
                        libId: {
                            $first: "$libId"
                        },
                        orderAt: {
                            $first: "$orderAt"
                        },
                        fullfilledAt: {
                            $first: "$fullfilledAt"
                        },
                        orderStatus: {
                            $first: "$orderStatus"
                        },
                        books: {
                            $push: {
                                _id: "$bookDetails._id",
                                title: "$bookDetails.title",
                                imgSrc: "$bookDetails.imgUrl",
                                author: "$bookDetails.author",
                                isbn: "$bookDetails.isbn",
                                genre: "$bookDetails.genre"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "libraries",
                        localField: "libId",
                        foreignField: "_id",
                        as: "LibDetails"
                    }
                },
                {
                    $unwind: "$LibDetails"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $unwind: "$userDetails"
                },
                {
                    $project: {
                        _id: "$_id",
                        deliveryDate: "$deliveryDate",
                        shippingAddress: "$shippingAddress",
                        userId: "$userId",
                        libId: "$libId",
                        orderAt: "$orderAt",
                        fullfilledAt: "$fullfilledAt",
                        orderStatus: "$orderStatus",
                        books: "$books",
                        libName: "$LibDetails.name",
                        userName: "$userDetails.name",
                        userImg: "$userDetails.profileImg"
                    }
                },
            ]
        ).toArray();

        return NextResponse.json({ order:order[0] }, { status: 200 });


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
        const { orderId } = body
        const client = await clientPromise;
        const db = client.db('lib');

        const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });

        console.log(order);
        const result = await db.collection('orders').updateOne(
            { _id: new ObjectId(orderId) },
            {
                $set: {
                    orderStatus: 'return',
                    fullfilledAt: new Date()
                }
            }
        );

        const updatedOrder = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });

        return new Response(JSON.stringify({ success: true, order: updatedOrder }), {
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