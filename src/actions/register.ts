"use server";
import { connectDB } from "@/lib/database";
import { Cart } from "@/models/Cart";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// Better type definition instead of `any`
interface RegisterValues {
  email: string;
  password: string;
  name: string;
}

export const register = async (values: RegisterValues) => {
  const { email, password, name } = values;

  try {
    await connectDB();

    // Check if user already exists
    const userFound = await User.findOne({ email: email.toLowerCase() });
    console.log(userFound);
    if (userFound) {
      return {
        message: "User already exists",
        error: "Email already exists!",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create cart and user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "ADMIN",
    });

    const cart = new Cart({ user: user._id });

    // Save both cart and user concurrently
    await Promise.all([user.save(), cart.save()]);

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      message: "An error occurred during registration",
      error: e,
    };
  }
};
