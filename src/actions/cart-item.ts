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
    return {
      _id: itemExists._id.toString(),
      cart: itemExists.cart.toString(),
      product: itemExists.product.toString(),
      quantity: itemExists.quantity,
    };
  }

  const newItem = new CartItem({
    product: product,
    cart: cart._id,
    quantity: quantity,
  });

  await newItem.save();

  // Return a plain object with the necessary data
  return {
    _id: newItem._id.toString(),
    cart: newItem.cart.toString(),
    product: newItem.product.toString(),
    quantity: newItem.quantity,
  };
};

export const getCartItems = async (cartId: string) => {
  await connectDB();

  const cartItems = await CartItem.find({ cart: cartId });

  return cartItems.map((item) => ({
    _id: item._id.toString(),
    product: item.product.toString(),
    quantity: item.quantity,
  }));
};

export const getCartItemsCount = async (email: string) => {
  await connectDB();
  const user = await User.findOne({ email });
  const cart = await Cart.findOne({ user: user._id, status: "ACTIVE" });
  return {
    user: user,
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
    userId: user._id,
    cart,
    items: newItems,
  };
};