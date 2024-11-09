import {connect} from '../../../lib/dbConnection/mongoose';
import User from '../../../lib/models/users';

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const {userId, street, state, city, zip} = body;

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

        user.address.street = street;
        user.address.city = city;
        user.address.state = state;
        user.address.zip = zip;

        await user.save();

        return new Response(JSON.stringify({ success: true, address: user.address }), {
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

export async function GET(req) {
    try{
        await connect();

        const userId = req.headers.get('userId')
        const userAdd = await User.findOne({authId: userId}).select('address');

        if (!userAdd) {
            return new Response(JSON.stringify({ success: false, message: 'User address not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        return new Response(JSON.stringify(userAdd), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

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