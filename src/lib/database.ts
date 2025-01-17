import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.DATABASE_URI as string
    );
    console.log("Database connected:", connection.connection.host);
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
