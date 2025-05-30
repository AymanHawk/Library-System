
import clientPromise from '../../../lib/dbConnection/mongoDB.js'



export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const limit = url.searchParams.get('limit') || 15;
  const page = url.searchParams.get('page') || 1;


  if (!query) {
    return new Response(JSON.stringify({ message: 'Query parameter is required' }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('lib');

  const skip = (parseInt(page) - 1) * limit;

  const totalCount = await db.collection('books')
    .countDocuments({
      $or: [
        { title: { $regex: `${query}`, $options: 'i' } },
        { author: { $regex: `${query}`, $options: 'i' } },
        { isbn: query }
      ]
    });

  const books = await db.collection('books')
    .find({
      $or: [
        { title: { $regex: `${query}`, $options: 'i' } },
        { author: { $regex: `${query}`, $options: 'i' } },
        { isbn: query }
      ]
    })
    .project({ title: 1, author: 1, imgUrl: 1, isbn: 1, _id: 1, genre: 1, format: 1, length: 1})
    .skip(skip)
    .limit(parseInt(limit))
    .toArray();

  return new Response(JSON.stringify({ books, totalCount }), { status: 200 });
}
