"use server";
import { connectDB } from "@/lib/database";
import { IDiscount } from "@/models/Discount";
import { Category, Discount } from "@/models";
import { ICategory } from "@/models/Category";

export const findByCode = async (code: string) => {
  await connectDB();
  return await Discount.findOne({ code });
};
const getCleanedData = (data: IDiscount) => {
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
    console.log(err);
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
  product: string,
  company: string,
  category: ICategory,
  productPrice: number
) => {
  await connectDB();
  const date = new Date();

  const getAllParentCategories = async (slug: string): Promise<string[]> => {
    const categoryDoc = await Category.findOne({ slug });
    if (!categoryDoc.parent) return [categoryDoc._id.toString()];
    const parentCategories = await getAllParentCategories(
      categoryDoc.parent as string
    );
    return [categoryDoc._id.toString(), ...parentCategories];
  };
  const categories = await getAllParentCategories(category.slug);
  const discounts = await Discount.find({
    $and: [
      { startDate: { $lte: date } },
      {
        $or: [{ endDate: null }, { endDate: { $gt: date } }],
      },
      {
        $or: [{ product }, { company }, { category: { $in: categories } }],
      },
    ],
  });

  if (!discounts || discounts.length === 0) {
    return null;
  }

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
    bestDiscount,
  };
};


