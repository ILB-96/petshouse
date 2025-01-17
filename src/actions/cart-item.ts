"use server";
import { connectDB } from "@/lib/database";
import { CartItem, User, Cart, Category } from "@/models";
import { findDiscountsByProduct } from "./discount";
export const createCartItem = async (
  product: string,
  user: string,
  quantity: number
) => {
  await connectDB();

  const cart = await Cart.findOne({ user: user, status: "ACTIVE" });

  if (!cart) {
    throw new Error("No active cart found for the user.");
  }
  const itemExists = await CartItem.findOne({
    cart: cart._id,
    product: product,
  });

  if (itemExists) {
    itemExists.quantity += quantity;
    await itemExists.save();
    return "Cart item updated successfully";
  }

  const newItem = new CartItem({
    product: product,
    cart: cart._id,
    quantity: quantity,
  });

  await newItem.save();

  return "Cart item created successfully";
};

export const getCartItems = async (cartId: string) => {
  await connectDB();

  const cartItems = await CartItem.find({ cart: cartId });

  return JSON.parse(JSON.stringify(cartItems));
};

export const getCartItemsCount = async (email: string) => {
  await connectDB();
  const user = await User.findOne({ email });
  const cart = await Cart.findOne({ user: user._id, status: "ACTIVE" });
  return {
    user: JSON.parse(JSON.stringify(user)),
    cartItemsCount: await CartItem.find({ cart: cart._id }).countDocuments(),
  };
};

export const increaseQuantity = async (id: string) => {
  await connectDB();
  const item = await CartItem.findById(id);
  item.quantity += 1;
  await item.save();
};
export const decreaseQuantity = async (id: string) => {
  await connectDB();
  const item = await CartItem.findById(id);
  item.quantity -= 1;
  await item.save();
};
export const setQuantity = async (id: string, quantity: number) => {
  await connectDB();
  const item = await CartItem.findById(id);
  item.quantity = quantity;
  await item.save();
};

export const deleteCartItem = async (id: string) => {
  await connectDB();
  await CartItem.deleteOne({ _id: id });
};

export const findCartItems = async (email: string) => {
  if (email === "") {
    // Fetch local cart from localStorage
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return {
      cart: { userId: "local", status: "ACTIVE" },
      items: localCart, // Local cart doesn't have a schema, so we return raw data
    };
  }
  await connectDB();

  const user = await User.findOne({ email });
  const cart = await Cart.findOne({ user: user._id, status: "ACTIVE" });

  if (!cart) {
    throw new Error("No active cart found for the user.");
  }

  // Fetch cart items and populate product and its images
  const items = await CartItem.find({ cart: cart._id }).populate({
    path: "product",
    populate: {
      path: "images",
      model: "Media",
    },
  });
  const newItems = await Promise.all(
    items.map(async (item) => {
      const category = await Category.findById(item.product.category);
      const discounts = await findDiscountsByProduct(
        item._id.toString(),
        item.product.company,
        category,
        item.product.price
      );

      const { buyXgetYDiscount, highestValue } = discounts || {
        buyXgetYDiscount: null,
        highestValue: 0,
      };

      // Convert Mongoose document to plain object
      const product = item.product.toObject();

      return {
        ...item.toObject(),
        product: {
          ...product,
          newPrice: product.price - highestValue,
          discount: buyXgetYDiscount,
        },
      };
    })
  );
  return {
    userId: user._id.toString(),
    cart: JSON.parse(JSON.stringify(cart)),
    items: JSON.parse(JSON.stringify(newItems)),
  };
};