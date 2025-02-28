"use server";
import { connectDB } from "@/lib/database";
import { IOrder } from "@/models/Order";
import { Order, Category } from "@/models";
import { revalidatePath } from "next/cache";

export const createOrder = async (values: IOrder) => {
  try {
    await connectDB();
    const order = new Order(values);

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
    const order = await Order.findById(orderId).lean();
    return JSON.parse(JSON.stringify(order));
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
export const findUserOrders = async (userId: string) => {
  try {
    await connectDB();
    const orders = await Order.find({ user: userId }).lean();
    return JSON.parse(JSON.stringify(orders));
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
    console.log(err);
    throw new Error("Failed to fetch categories!");
  }
};

export const deleteOrder = async (
  formData: Iterable<readonly [PropertyKey, unknown]>
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
