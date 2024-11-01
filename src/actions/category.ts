"use server";
import { connectDB } from "@/lib/database";
import { Category } from "@/models/Category";

// Better type definition instead of `any`
interface CategoryValues {
  name: string;
  slug: string;
  parentSlug: string;
}

export const createCategory = async (values: CategoryValues) => {
  const { name, slug, parentSlug } = values;

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

    if (parentSlug) {
      const parentCategory = await Category.findOne({ slug: parentSlug });
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
      isDraft: false,
      parent: parentSlug,
    });
    console.log(category);
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
  const { name, slug, parentSlug } = values;

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

    if (parentSlug) {
      const parentCategory = await Category.findOne({ slug: parentSlug });
      if (!parentCategory) {
        return {
          message: "Parent category not found!",
          error: "Parent category not found!",
        };
      }
    }

    categoryBySlug.parent = parentSlug;
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
