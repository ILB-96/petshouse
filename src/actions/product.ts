"use server";
import { connectDB } from "@/lib/database";
import { Category } from "@/models/Category";
import { Company } from "@/models/Company";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

// Better type definition instead of `any`
interface ProductValues {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  price: number;
  stock: number;
  categorySlug: string;
  companySlug: string;
  description: string;
  ingredients: string;
}

export const createProduct = async (values: ProductValues) => {
  const {
    name,
    slug,
    sku,
    shortDescription,
    price,
    stock,
    categorySlug,
    companySlug,
    description,
    ingredients,
  } = values;

  try {
    await connectDB();

    // Check if user already exists
    const company = await Company.findOne({ slug: companySlug });
    if (!company) {
      return {
        message: "Company not found!",
        error: "Company not found!",
      };
    }
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return {
        message: "Category not found!",
        error: "Category not found!",
      };
    }

    // Create cart and user
    const product = new Product({
      name,
      slug,
      sku,
      shortDescription,
      price,
      stock,
      categoryId: category._id,
      companyId: company._id,
      description,
      ingredients,
    });

    // Save both cart and user concurrently
    await product.save();

    return {
      message: "Product registered successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
};

export const editProduct = async (values: ProductValues) => {
  const { name, slug, url } = values;

  try {
    await connectDB();

    // Check if user already exists
    const product = await Product.findOne({ name });
    if (!product) {
      return {
        message: "Category slug doesn't exists!",
        error: "Category slug doesn't exists!",
      };
    }

    product.name = name;
    product.slug = slug;
    product.url = url;
    await product.save();

    return {
      message: "Product updated successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      message: "An error occurred during save. Please try again later.",
      error: JSON.stringify(e),
    };
  }
};

export const findOneProduct = async (slug: string) => {
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    return { ...product, _id: product?._id.toString() };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getProducts = async (
  q: string | RegExp,
  page: number,
  products_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await Product.find({
      slug: { $regex: regex },
      deletedAt: null,
    }).countDocuments();
    const products = await Product.find({
      slug: { $regex: regex },
      deletedAt: null,
    })
      .limit(products_per_page)
      .skip(products_per_page * (page - 1));
    return { count, products };
  } catch (err) {
    throw new Error("Failed to fetch companies!");
  }
};

export const deleteProduct = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { slug } = Object.fromEntries(formData);

  try {
    connectDB();
    const product = await Product.findOne({ slug });
    product.deletedAt = new Date();
    await product.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Product!");
  }

  revalidatePath("/admin/products");
};
