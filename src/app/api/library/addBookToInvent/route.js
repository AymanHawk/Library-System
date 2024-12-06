import { connect } from '../../../../lib/dbConnection/mongoose'
import Library from '../../../../lib/models/library';


export async function POST(req) {
    try {

        await connect();
        const body = await req.json();
        const { libId, bookId } = body;

        if (!libId || !bookId) {
            return new Response(JSON.stringify({ success: false, message: 'Missing data in request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const library = await Library.findOne({ authId: libId });


        if (!library) {
            return new Response(JSON.stringify({ success: false, message: 'Library not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        library.bookStock = library.bookStock || [];


        const existingBook = library.bookStock.find(stock => stock.bookId.equals(bookId));

        if (existingBook) {
            existingBook.amount += 1;
        } else {
            library.bookStock.push({ bookId: bookId, amount: 1 });
        }

        await library.save();


        return new Response(JSON.stringify({ success: true, inventory: library.bookStock }), {
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