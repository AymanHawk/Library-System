import clientPromise from "../../../../lib/dbConnection/mongoDB";

export async function GET(req) {
    try {

        const title = req.headers.get('title');
        const author = req.headers.get('author');
        const isbn = parseInt(req.headers.get('isbn'));
        const lang = req.headers.get('lang');
        const format = req.headers.get('format');


        const client = await clientPromise;
        const db = client.db('lib');

        const find = [];
        if (title) find.push({ title: { $regex: title, $options: 'i' } });
        if (author) find.push({ author: { $regex: author, $options: 'i' } });
        if (lang) find.push({ language: { $regex: lang, $options: 'i' } });
        if (format) find.push({ format: { $regex: format, $options: 'i' } });
        if (!isNaN(isbn)) find.push({ isbn: isbn });

        const findQuery = find.length > 0 ? { $and: find } : {};


        const books = await db.collection('books')
            .find(findQuery)
            .limit(5)
            .project({ title: 1, author: 1, imgUrl: 1, isbn: 1, _id: 1, genre: 1, format: 1, length: 1, language: 1})
            .toArray();

        return new Response(JSON.stringify({ books }), { status: 200 });


    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}