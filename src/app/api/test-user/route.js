import { connect } from '../../../lib/mongodb/mongoose'
import User2 from '../../../lib/models/user2.model'; 

export async function GET(request) {
  await connect(); // Connect to MongoDB

  try {
    const users = await User2.find({}); // Fetch all users
    return new Response(JSON.stringify({ success: true, data: users }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  await connect(); // Connect to MongoDB

  try {
      const body = await request.json(); // Parse the request body

      // Check if a user with the same email already exists
      const existingUser = await User2.findOne({ email: body.email });
      if (existingUser) {
          return new Response(JSON.stringify({ success: false, error: "Email already in use." }), {
              status: 400,
          });
      }

      const newUser = await User2.create(body); // Create a new user
      return new Response(JSON.stringify({ success: true, data: newUser }), {
          status: 201,
      });
  } catch (error) {
      console.error("Error creating user:", error); // Log the error
      return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
      });
  }
}
