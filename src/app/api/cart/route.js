import clientPromise from "../../../lib/dbConnection/mongoDB";


export async function GET(req) {
    try {

        const userId = req.headers.get('userId');
        const client = await clientPromise;
        const db = client.db('lib');

        const user = await db.collection('users').findOne({ authId: userId });

        const userCart = user.cart;

        const cart = [];

        for (const item of userCart) {
            const bookInfo = await db.collection('books')
                .findOne({ _id: item.bookId }, { projection: { title: 1, author: 1, imgUrl: 1, isbn: 1, _id: 1, genre: 1, format: 1, length: 1, rating: 1 } });
            
            const library = await db.collection('libraries')
                .findOne({ _id: item.libId }, { projection: { name: 1, userAcc: 1, _id: 1 } });
 
            const isMember = user.libCards.some(id => {
                if (id.libId.equals(library._id)) {
                    return library.userAcc.includes(id.cardId);
                }
                return false;
            });
            
            const libraryInfo = { name: library.name, _id: library._id };


            cart.push({
                bookInfo, libraryInfo, isMember
            });
        }

        return new Response(JSON.stringify(cart), { status: 200 });
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