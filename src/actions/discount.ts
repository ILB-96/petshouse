"use server";
import { connectDB } from "@/lib/database";
import { IDiscount } from "@/models/Discount";
import { Category, Discount } from "@/models";
import { json } from "stream/consumers";
import { findOneCategory } from "./category";

export const findByCode = async (code: string) => {
  await connectDB();
  return await Discount.findOne({ code });
};
const getCleanedData = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) =>
        value != undefined &&
        !(Array.isArray(value) && value.length === 0) &&
        value !== "" &&
        value !== 0
    )
  );
};
export const createDiscount = async (discountData: IDiscount) => {
  try {
    const cleanedData = getCleanedData(discountData);
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
  const cleanedData = getCleanedData(discountData);
  await connectDB();
  const discount = await Discount.findById(id);
  if (!discount) {
    throw new Error("Discount not found");
  }
  discount.set(cleanedData);
  discount.save();
  return { message: "Discount updated successfully" };
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
  const date = new Date();
  const discounts: IDiscount[] = await Discount.find({
    code: null,
    startDate: { $lt: date },
    $or: [{ endDate: null }, { endDate: { $gt: date } }],
  })
    .populate({
      path: "product",
      populate: {
        path: "images",
        model: "Media",
      },
    })
    .populate({
      path: "getProduct",
      populate: {
        path: "images",
        model: "Media",
      },
    });
  if (!discounts) {
    return [];
  }

  return JSON.parse(JSON.stringify(discounts));
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
  return JSON.parse(JSON.stringify(discount));
};

export const findDiscountsByProduct = async (
  product,
  company,
  category,
  productPrice
) => {
  await connectDB();
  const date = new Date();

  // Step 1: Fetch all relevant categories (including parent categories)
  const getAllParentCategories = async (slug) => {
    const categoryDoc = await Category.findOne({ slug });
    console.log(categoryDoc);
    if (!categoryDoc.parent) return [categoryDoc._id.toString()];
    const parentCategories = await getAllParentCategories(
      categoryDoc.parent as string
    );
    return [categoryDoc._id.toString(), ...parentCategories];
  };
  const categories = await getAllParentCategories(category.slug);
  console.log(categories);
  // Step 2: Find all discounts that apply to the product
  const discounts = await Discount.find({
    $and: [
      { startDate: { $lte: date } }, // Discounts that have started
      {
        $or: [
          { endDate: null }, // Discounts with no expiration
          { endDate: { $gt: date } }, // Discounts that are still valid
        ],
      },
      {
        $or: [
          { product }, // Discounts directly tied to the product
          { company }, // Discounts tied to the product's company
          { category: { $in: categories } }, // Discounts tied to the category or its parents
        ],
      },
    ],
  });

  if (!discounts || discounts.length === 0) {
    return null; // No discounts found
  }

  // Step 3: Filter and find the best discounts
  let buyXgetYDiscount = null;
  let bestDiscount = null;
  let highestValue = 0;

  discounts.forEach((discount) => {
    if (discount.type === "buyXgetY") {
      buyXgetYDiscount = discount; // Always include buyXgetY discounts
    } else {
      // Calculate the discount value
      let discountValue = 0;
      if (discount.discountPercentage) {
        discountValue = (discount.discountPercentage / 100) * productPrice;
      } else if (discount.discountAmount) {
        discountValue = discount.discountAmount;
      }
      if (discountValue > highestValue) {
        highestValue = discountValue;
        bestDiscount = discount;
      }
    }
  });

  // Step 4: Return the relevant discounts
  return {
    buyXgetYDiscount,
    highestValue,
  };
};


