import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Set your MongoDB URI in environment variables
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { bookIds } = body;

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
      return new Response(JSON.stringify({ message: "Invalid book IDs" }), { status: 400 });
    }

    await client.connect();
    const database = client.db("lib");
    const booksCollection = database.collection("books");

    const books = await booksCollection
      .find({ _id: { $in: bookIds.map((id) => new ObjectId(id)) } })
      .toArray();

    return new Response(JSON.stringify({ books }), { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  } finally {
    await client.close();
  }
}
