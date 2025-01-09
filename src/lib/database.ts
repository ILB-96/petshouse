import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Use await for the connection
    const connection = await mongoose.connect(
      process.env.DATABASE_URI as string
    );
    console.log("Database connected:", connection.connection.host);
    return true; // No need to wrap in `Promise.resolve`
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // No need for `Promise.reject`
  }
};
