import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  img_url,
  email_addresses,
  username
) => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Find user by 'clerkId' and update, or create if doesn't exist
    const user = await User.findOneAndUpdate(
      { clerkId: id }, // filter: find by 'clerkId'
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: img_url,
          email: email_addresses[0]?.email, // Accessing the first email
          username: username
        }
      },
      { new: true, upsert: true } // 'new: true' returns the updated document; 'upsert: true' creates a new one if not found
    );

    // Return the updated or created user
    return user;
  } catch (error) {
    // Handle any errors during the operation
    console.error("Error in createOrUpdateUser:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Find and delete user by 'clerkId'
    const deletedUser = await User.findOneAndDelete({ clerkId: id });

    // Return some confirmation (optional)
    if (deletedUser) {
      return { message: "User deleted successfully", deletedUser };
    } 
  } catch (error) {
   
    console.error("Error in deleteUser:", error);
    throw error;
  }
};
