import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      const { connection } = await mongoose.connect(
        process.env.DATABASE_URI as string
      );
      if (connection.readyState === 1) {
        return Promise.resolve(true);
      }
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
