import clientPromise from "../../../../../lib/dbConnection/mongoDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function GET(req) {
    try {
        const libId = req.headers.get('libId');
        const limit = parseInt(req.headers.get('limit')) || 15;
        const page = parseInt(req.headers.get('page')) || 1;
        console.log(libId)
        if (!libId) {
            return NextResponse.json({ error: 'Missing libId' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('lib');
        const skip = (page - 1) * limit;

        const library = await db.collection('libraries').findOne({ authId: libId });
        const orders = await db.collection('orders').aggregate(
            [
                {
                    $match: {
                        libId: new ObjectId(library._id),
                        orderStatus: 'returned'
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
                                isbn: "$bookDetails.isbn"
                            }
                        }
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]
        ).toArray();

        const totalCount = orders.length;

        return NextResponse.json({ orders, totalCount }, { status: 200 });

    } catch (error) {
        console.error('Database operation error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}