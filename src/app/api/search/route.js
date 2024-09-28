// src/app/api/search/route.js
//import { MongoClient } from 'mongodb';
import rateLimit from 'express-rate-limit';
import clientPromise from '../../../lib/mongoDB.js'

// Replace with your actual MongoDB connection string
// const MONGODB_URI = 'mongodb+srv://fanged-shadow:7BdyIP9hqlIjjyHZ@librarydeliverycluster.o8ory.mongodb.net/'; // Replace with your actual connection string
// let cachedClient;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10 // Limit each IP to 10 requests per windowMs
});

// async function connectToDatabase() {
//   if (cachedClient) {
//     return cachedClient;
//   }

//   const client = await MongoClient.connect(MONGODB_URI);
//   cachedClient = client;
//   return client;
// }

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  //console.log('API called with query:', query); 

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
    .project({ title: 1, author: 1, imgUrl: 1, isbn: 1 })
    .limit(6) 
    .toArray();

  return new Response(JSON.stringify(books), { status: 200 });
}
