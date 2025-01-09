"use server";
import { connectDB } from "@/lib/database";
import { IDiscount } from "@/models/Discount";
import { Discount } from "@/models";

export const findByCode = async (code: string) => {
  await connectDB();
  return await Discount.findOne({ code });
};

export const createDiscount = async (discountData: IDiscount) => {
  try {
    const cleanedData = Object.fromEntries(
      Object.entries(discountData).filter(
        ([_, value]) =>
          value != undefined &&
          !(Array.isArray(value) && value.length === 0) &&
          value !== ""
      )
    );
    await connectDB();
    const discount = new Discount(cleanedData);
    await discount.save();
    return { message: "Discount created successfully" };
  } catch (e) {
    if (e instanceof Error) {
      return { message: e.toString() };
    }
    return { message: String(e) };
  }
};

export const updateDiscount = async (id: string, discountData: IDiscount) => {
  await connectDB();
  const discount = await Discount.findById(id);
  if (!discount) {
    throw new Error("Discount not found");
  }
  discount.set(discountData);
};

export const deleteDiscount = async (formData: FormData) => {
  await connectDB();

  const id = formData.get("id") as string;
  await Discount.findByIdAndDelete(id);
};

export const findAllActiveDiscounts = async () => {
  await connectDB();
  // startDate greater or equal now and endDate less than now
  const date = new Date();
  const discounts: IDiscount[] = await Discount.find({
    startDate: { $lte: date },
    endDate: { $gt: date },
  }).lean();
  if (!discounts) {
    return [];
  }

  return discounts.map((discount: IDiscount) => ({
    ...discount,
    _id: discount._id.toString(),
  }));
};

export const findAllDiscounts = async () => {
  await connectDB();
  const discounts: IDiscount[] = await Discount.find().lean();
  if (!discounts) {
    return [];
  }

  return discounts.map((discount: IDiscount) => ({
    ...discount,
    _id: discount._id.toString(),
  }));
};

export const getDiscounts = async (
  q: string | RegExp,
  page: number,
  items_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await Discount.find({
      slug: { $regex: regex },
    }).countDocuments();
    const discounts = await Discount.find({
      slug: { $regex: regex },
    })
      .limit(items_per_page)
      .skip(items_per_page * (page - 1));
    return { count, discounts };
  } catch (err) {
    throw new Error("Failed to fetch categories!");
  }
};

export const findOneDiscount = async (id: string) => {
  await connectDB();
  const discount = await Discount.findById(id);
  if (!discount) {
    return null;
  }
  return { discount, _id: discount._id.toString() };
};
