"use server";
import { connectDB } from "@/lib/database";
import { Category, ICategory } from "@/models/Category";
import { revalidatePath } from "next/cache";

export const createCategory = async (values: ICategory) => {
  console.log("What", values);
  const { name, slug, parent, isDraft } = values;
  try {
    await connectDB();

    // Check if user already exists
    const categoryBySlug = await Category.findOne({ slug });
    if (categoryBySlug) {
      return {
        message: "Category slug already exists!",
        error: "Category slug already exists!",
      };
    }

    if (parent) {
      const parentCategory = await Category.findOne({ slug: parent });
      if (!parentCategory) {
        return {
          message: "Parent category not found!",
          error: "Parent category not found!",
        };
      }
    }
    const category = new Category({
      name,
      slug,
      isDraft: isDraft,
      parent: parent,
    });

    await category.save();
    return {
      message: "Category registered successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      message: "An error occurred during save. Please try again later.",
      error: JSON.stringify(e),
    };
  }
};

export const editCategory = async (values: CategoryValues) => {
  const { name, slug, parent } = values;

  try {
    await connectDB();

    // Check if user already exists
    const categoryBySlug = await Category.findOne({ slug });
    if (!categoryBySlug) {
      return {
        message: "Category slug doesn't exists!",
        error: "Category slug doesn't exists!",
      };
    }

    if (parent) {
      const parentCategory = await Category.findOne({ slug: parent });
      if (!parentCategory) {
        return {
          message: "Parent category not found!",
          error: "Parent category not found!",
        };
      }
    }

    categoryBySlug.parent = parent;
    categoryBySlug.name = name;
    categoryBySlug.slug = slug;
    await categoryBySlug.save();

    return {
      message: "Category updated successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      message: "An error occurred during save. Please try again later.",
      error: JSON.stringify(e),
    };
  }
};

export const findOneCategory = async (slug: string) => {
  try {
    await connectDB();
    const category = await Category.findOne({ slug }).lean();
    return { ...category, _id: category?._id.toString() };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getCategories = async (
  q: string | RegExp,
  page: number,
  categories_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await Category.find({
      slug: { $regex: regex },
      deletedAt: null,
    }).countDocuments();
    const categories = await Category.find({
      slug: { $regex: regex },
      deletedAt: null,
    })
      .limit(categories_per_page)
      .skip(categories_per_page * (page - 1));
    return { count, categories };
  } catch (err) {
    throw new Error("Failed to fetch categories!");
  }
};

export const deleteCategory = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { slug } = Object.fromEntries(formData);

  try {
    connectDB();
    const category = await Category.findOne({ slug });
    category.deletedAt = new Date();
    await category.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/admin/categories");
};