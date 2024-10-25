// lib/user.ts
import { User } from "@/models/User"; // Your User model (update the path accordingly)

/**
 * Fetches the user from the database using their user ID.
 *
 * @param {string} userId - The user's ID (usually from the session token).
 * @returns {Promise<Object | null>} - The user object, including cartId if found.
 */
export async function getUserFromDatabase(email: string) {
  try {
    // Query the MongoDB database using Mongoose to find the user by their ID
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log(`User with ID ${email} not found`);
      return null;
    }

    // Return the user data with cartId
    return {
      _id: user._id,
      role: user.role,
      image: user.image || null,
      // You can add more fields here if needed
    };
  } catch (error) {
    console.error(`Error fetching user from database: ${error}`);
    return null;
  }
}
