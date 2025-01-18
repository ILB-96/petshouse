import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      (process.env.DATABASE_URI as string) ||
        "mongodb://localhost:27017/petshouse"
    );
    return true;
  } catch (error) {
    throw error;
  }
};
