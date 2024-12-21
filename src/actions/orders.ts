"use server";
import { connectDB } from "@/lib/database";
import { Category, ICategory } from "@/models/Category";
import { IOrder, Order } from "@/models/Order";
import { revalidatePath } from "next/cache";

export const createOrder = async (values: IOrder) => {
  console.log("What", values);
  const { userId, subtotal, tax, shipping, cartId } = values;
  try {
    await connectDB();
    const order = new Order({
      userId,
      subtotal,
      tax,
      shipping,
      cartId,
    });

    await order.save();
    return {
      message: "Order created successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      message: "An error occurred during save. Please try again later.",
      error: JSON.stringify(e),
    };
  }
};

export const findOneOrder = async (orderId: string) => {
  try {
    await connectDB();
    const category = await Category.findOne({ orderId }).lean();
    return { ...category, _id: category?._id.toString() };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getOrders = async (
  q: string | RegExp,
  page: number,
  orders_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await Order.find({
      orderId: { $regex: regex },
    }).countDocuments();
    const orders = await Category.find({
      orderId: { $regex: regex },
    })
      .limit(orders_per_page)
      .skip(orders_per_page * (page - 1));
    return { count, orders };
  } catch (err) {
    throw new Error("Failed to fetch categories!");
  }
};

export const deleteOrder = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { orderId } = Object.fromEntries(formData);

  try {
    connectDB();
    const order = await Order.findOne({ orderId });
    order.deletedAt = new Date();
    await order.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Order!");
  }

  revalidatePath("/admin/orders");
};
