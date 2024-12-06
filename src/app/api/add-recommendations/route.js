import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { userId, recommendations } = body;

    if (!userId || !Array.isArray(recommendations)) {
      return new Response(
        JSON.stringify({ message: "Invalid input" }),
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db("lib");
    const usersCollection = db.collection("users");

    await usersCollection.updateOne(
      { authId: userId },
      { $addToSet: { "bookList.recomendation": { $each: recommendations } } }
    );

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /add-recommendations:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
