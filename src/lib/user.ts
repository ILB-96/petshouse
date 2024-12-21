"use server";
import { User } from "@/models/User"; // Your User model (update the path accordingly)
import { connectDB } from "./database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { startOfDay, subDays } from "date-fns";

export async function getUserFromDatabase(email: string) {
  try {
    // Query the MongoDB database using Mongoose to find the user by their ID
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

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
export const addUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { username, email, password, role } = Object.fromEntries(formData);

  try {
    connectDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id, name, email, password, role } = Object.fromEntries(formData);
  console.log(id, name, email, password, role);
  try {
    connectDB();

    const updateFields: { [key: string]: any } = {
      name,
      email,
      password,
      role,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );
    console.log(updateFields);

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ _id: new Types.ObjectId(id) });
    return user;
  } catch {
    return null;
  }
};

export const getUsers = async (
  q: string | RegExp,
  page: number,
  user_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await User.find({
      name: { $regex: regex },
    }).countDocuments();
    const users = await User.find({ name: { $regex: regex } })
      .limit(user_per_page)
      .skip(user_per_page * (page - 1));
    return { count, users };
  } catch (err) {
    throw new Error("Failed to fetch users!");
  }
};

export const getUsersStatistics = async () => {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const oneWeekAgo = subDays(new Date(), 7);
    const newUsersThisWeek = await User.countDocuments({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    });
    let usersChange = 0;
    if (totalUsers !== newUsersThisWeek) {
      usersChange = (newUsersThisWeek / (totalUsers - newUsersThisWeek)) * 100;
    }

    return { totalUsers, usersChange: usersChange.toFixed(2) };
  } catch (error) {
    throw new Error("Failed to fetch users statistics");
  }
};

export const getUsersChart = async () => {
  try {
    await connectDB();

    const today = startOfDay(new Date());
    const oneWeekAgo = subDays(today, 6);

    const userData = await User.find({
      _id: {
        $gte: Types.ObjectId.createFromTime(
          Math.floor(oneWeekAgo.getTime() / 1000)
        ),
      },
    }).sort({ _id: 1 });

    // Group data by day
    const groupedData = userData.reduce((acc, user) => {
      const date = new Date(user._id.getTimestamp())
        .toISOString()
        .split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    // Format data for the chart
    const formattedData = Object.keys(groupedData).map((date) => ({
      date,
      count: groupedData[date],
    }));

    return { usersData: formattedData };
  } catch (error) {
    console.error("Failed to fetch users statistics", error);
    throw new Error("Failed to fetch users statistics");
  }
};
