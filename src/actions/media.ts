"use server";
import { connectDB } from "@/lib/database";
import { Category, Media } from "@/models";
import { IMedia } from "@/models/Media";
import { revalidatePath } from "next/cache";

export const createMedia = async (data: IMedia) => {
  try {
    await connectDB();

    // Check if user already exists
    const item = await Media.findOne({ name: data.name });
    if (item) {
      return {
        message: "item already exists!",
        error: "item already exists!",
      };
    }

    const newItem = new Media({
      name: data.name,
      source: data.source,
      caption: data.caption,
      type: data.type,
    });

    await newItem.save();
    revalidatePath("/admin/Medias");
    return {
      message: "Item registered successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      message: "An error occurred during save. Please try again later.",
      error: JSON.stringify(e),
    };
  }
};

export const findOneMedia = async (name: string) => {
  try {
    await connectDB();
    const item = await Media.findOne({ name }).lean();
    return { ...item, _id: item?._id.toString() };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
export const findAllMedia = async () => {
  try {
    await connectDB();
    const items = await Media.find().lean();
    return items.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e: unknown) {
    console.error("Error finding categories:", e); // Improved error logging
    return null;
  }
};

export const getMedia = async (
  q: string | RegExp,
  page: number,
  items_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await Media.find({
      name: { $regex: regex },
    }).countDocuments();
    const items = await Media.find({
      name: { $regex: regex },
    })
      .limit(items_per_page)
      .skip(items_per_page * (page - 1));
    return { count, items };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch categories!");
  }
};

export const deleteMedia = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { name } = Object.fromEntries(formData);
  try {
    connectDB();
    await Category.deleteOne({ name });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/admin/Medias");
};
