import { connect } from "../../../lib/dbConnection/mongoose";
import User from "../../../lib/models/users";

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const {userId, bookId, libId, } = body;

        if(!userId) {
            return new Response(JSON.stringify({ success: false, message: 'Missing data in request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await User.findOne({ authId: userId });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        user.cart = user.cart || [];

        const existingBook = user.cart.find(book => book.bookId.equals(bookId));

        if(!existingBook){
            user.cart.push({bookId: bookId, libId: libId});
        }

        await user.save();

        return new Response(JSON.stringify({ success: true, cart: user.cart }), {
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