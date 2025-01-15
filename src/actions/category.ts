"use server";
import { connectDB } from "@/lib/database";
import { ICategory } from "@/models/Category";
import { Category } from "@/models";
import mongoose, { Types } from "mongoose";
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
    let parentCategory = null;
    if (parent) {
      parentCategory = await Category.findOne({ slug: parent });
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
      parent: parentCategory ? parent : undefined,
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

export const editCategory = async (values: ICategory) => {
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
      categoryBySlug.parent = parent;
    }
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
    if (!category || Array.isArray(category)) {
      return null;
    }
    return {
      ...category,
      _id: (category._id as Types.ObjectId).toString(),
    };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
export const findAllCategories = async () => {
  try {
    await connectDB();
    const categories = await Category.find({ deletedAt: null }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (e: unknown) {
    console.error("Error finding categories:", e); // Improved error logging
    return null;
  }
};
export const findMainCategories = async () => {
  try {
    await connectDB();
    const categories = await Category.find({
      deletedAt: null,
      isDraft: false,
      parent: null,
    });
    return JSON.parse(JSON.stringify(categories));
  } catch (e: unknown) {
    console.error("Error finding categories:", e); // Improved error logging
    return [];
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
    console.log(err);
    throw new Error("Failed to fetch categories!");
  }
};

export const deleteCategory = async (
  formData: Iterable<readonly [PropertyKey, unknown]>
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

// app/actions/getCategoryTree.ts

interface CategoryTree {
  _id: string;
  name: string;
  slug: string;
  parent?: string | null;
  isDraft: boolean;
  children: CategoryTree[];
}

export async function getCategoryTree(slug: string): Promise<CategoryTree> {
  // Helper function to recursively fetch children
  const buildTree = async (
    parentSlug: string | null
  ): Promise<CategoryTree[]> => {
    const categories = await Category.find({ parent: parentSlug }).lean();

    // For each category, fetch its children recursively
    const children = await Promise.all(
      categories.map(async (category) => ({
        _id: (category._id as mongoose.Types.ObjectId).toString(),
        name: category.name,
        slug: category.slug,
        parent: category.parent,
        isDraft: category.isDraft,
        children: await buildTree(category.slug),
      }))
    );

    return children;
  };

  // Start building the tree from the given slug
  const rootCategory = (await Category.findOne({
    slug,
    isDraft: false,
  }).lean()) as CategoryTree | null;
  if (!rootCategory) {
    throw new Error(`Category with slug "${slug}" not found`);
  }

  return {
    ...rootCategory,
    _id: rootCategory._id.toString(),
    children: await buildTree(rootCategory?.slug),
  };
}
