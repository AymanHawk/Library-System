
import clientPromise from '../../../lib/mongoDB.js'



export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');


  if (!query) {
    return new Response(JSON.stringify({ message: 'Query parameter is required' }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('lib'); 

  const books = await db.collection('books')
    .find({
      $or: [
        { title: { $regex: `^${query}`, $options: 'i' } }, 
        { author: { $regex: `^${query}`, $options: 'i' } }, 
        { isbn: query } 
      ]
    })
    .project({ title: 1, author: 1, imgUrl: 1, isbn: 1, _id: 1 })
    .limit(6) 
    .toArray();

  return new Response(JSON.stringify(books), { status: 200 });
}
