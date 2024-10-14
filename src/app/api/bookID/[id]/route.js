import clientPromise from '../../../../lib/dbConnection/mongoDB.js'
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { id } = params;  

  try {
    const client = await clientPromise;
    const db = client.db('lib');

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid book ID' }), { status: 400 });
    }

  
    const objectId = new ObjectId(id);

    const book = await db.collection('books').findOne({ _id: objectId });

    if (!book) {
      return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
    }


    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    console.error('Error fetching book:', error);
    return new Response(JSON.stringify({ message: 'Error finding book', error }), { status: 500 });
  }
}