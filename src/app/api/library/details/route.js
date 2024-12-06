import Library from "../../../../lib/models/library";
import { connect } from '../../../../lib/dbConnection/mongoose';

export async function GET(req) {
    try {
        await connect();
        const libId = await req.headers.get('libId');
        const library = await Library.findOne({ authId: libId });

        const address = library.address;
        const email = library.email;

        return new Response(JSON.stringify({ address, email }), {
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

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { libId, email, street, state, city, zip } = body;

        const library = await Library.findOne({ authId: libId });

        if (!library) {
            return new Response(JSON.stringify({ success: false, message: 'Library not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        library.address.street = street;
        library.address.city = city;
        library.address.state = state;
        library.address.zip = zip;
        library.email = email;

        await library.save();

        return new Response(JSON.stringify({ success: true, address: library.address }), {
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