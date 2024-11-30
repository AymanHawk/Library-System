import { connect } from "../../../lib/dbConnection/mongoose"
import User from "../../../lib/models/users";
import Order from '../../../lib/models/order';

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { userId, street, state, city, zip, orderDetail } = body;

        const dateToday = new Date();
        const user = await User.findOne({ authId: userId });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let ordersToCreate = [];

        for (const libId in orderDetail) {
            const books = orderDetail[libId];

            const bookIds = books.map((book) => book.bookInfo._id);

            const newOrder = new Order({
                deliveryDate: (dateToday.getDate() + 4),
                shippingAddress: {
                    street,
                    city,
                    state,
                    zip,
                },
                userId: user._id,
                bookIds: bookIds,
                libId: libId,
                fullfilledAt: null,
            })


            await newOrder.save();
            ordersToCreate.push(newOrder);

            user.cart = user.cart.filter(
                (cartItem) =>
                    !bookIds.some((bookId) => cartItem.bookId.equals(bookId)) ||
                    !cartItem.libId.equals(libId)
            );
            await user.save();

        }



        return new Response(JSON.stringify({ success: true, orders: ordersToCreate }), {
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