"use server";
import { connectDB } from "@/lib/database";
import { Category, Product, Company, Media } from "@/models";
import { IProduct } from "@/models/Product";
import { revalidatePath } from "next/cache";

// Better type definition instead of `any`

import { productSchemaZod } from "@/models/Product";

export const createProduct = async (productData: IProduct) => {
  try {
    await connectDB();

    // Validate `productData` using Zod
    const validatedProductData = productSchemaZod.parse(productData);

    // Check for unique slug
    const existingProduct = await Product.findOne({
      slug: validatedProductData.slug,
    });
    if (existingProduct) {
      return {
        message: "Product Slug already exists!",
        error: "Product already exists!",
      };
    }

    // Validate the existence of the referenced `Company`
    const companyExists = await Company.exists({
      _id: validatedProductData.company,
    });
    if (!companyExists) {
      return {
        message: "Company not found!",
        error: "Company not found!",
      };
    }

    // Validate the existence of the referenced `Category`
    const categoryExists = await Category.exists({
      _id: validatedProductData.category,
    });
    if (!categoryExists) {
      return {
        message: "Category not found!",
        error: "Category not found!",
      };
    }

    // Save the product
    const newProduct = new Product(validatedProductData);
    await newProduct.save();

    return {
      message: "Product registered successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
};

export const editProduct = async (productData: IProduct) => {
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
    // update product with new data using iteratable object
    for (const [key, value] of Object.entries(productData)) {
      product[key] = value;
    }

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

    // Use populate to fetch referenced data for category, company, and images
    const product = await Product.findOne({ slug })
      .populate("category", "name slug parent") // Populate categoryId with specific fields
      .populate("company", "name slug") // Populate companyId with specific fields
      .populate("images", "source caption") // Populate imagesId array with specific fields
      .lean(); // Convert Mongoose document to plain JavaScript object

    if (!product) {
      return null;
    }

    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch (e: unknown) {
    console.error(e);
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

// Helper function to collect all category IDs from a category tree
const getAllCategoryIds = (category: any): string[] => {
  let ids = [category._id];
  if (category.children && category.children.length > 0) {
    category.children.forEach((child: any) => {
      ids = [...ids, ...getAllCategoryIds(child)];
    });
  }
  return ids;
};

// Helper function to find a category by slug in the tree
const findCategoryBySlug = (category: any, slug: string): any => {
  if (category.slug === slug) {
    return category;
  }

  if (category.children && category.children.length > 0) {
    for (const child of category.children) {
      const found = findCategoryBySlug(child, slug);
      if (found) return found;
    }
  }

  return null;
};

export const getFilteredProducts = async (
  q: string | RegExp,
  page: number,
  sortby: string,
  categories: any,
  filters: string[],
  companiesFilter: string[],
  products_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();

    // Build the query object
    const query: any = {
      slug: { $regex: regex },
      deletedAt: null,
    };

    // Handle category filtering
    let categoryIds: string[] = [];
    if (filters.length === 0) {
      // If no filters, get all category IDs from the tree
      categoryIds = getAllCategoryIds(categories);
    } else {
      // If filters exist, get category IDs only for the filtered categories
      filters.forEach((filterSlug) => {
        const category = findCategoryBySlug(categories, filterSlug);
        if (category) {
          categoryIds.push(...getAllCategoryIds(category));
        }
      });
    }

    // Add category IDs to query if we have any
    if (categoryIds.length > 0) {
      query.category = { $in: categoryIds };
    } else if (filters.length > 0) {
      // If we had filters but found no categories, return empty result
      return { count: 0, products: [] };
    }

    // Handle company filtering
    if (companiesFilter && companiesFilter.length > 0) {
      // Find company IDs from slugs
      const companies = await Company.find({
        slug: { $in: companiesFilter },
      }).select("_id");

      const companyIds = companies.map((company) => company._id);

      // If we have company filters but found no matching companies, return empty result
      if (companyIds.length === 0) {
        return { count: 0, products: [] };
      }

      // Add company IDs to query
      query.company = { $in: companyIds };
    }

    // Determine sort criteria
    let sortCriteria: Record<string, 1 | -1> = {};
    switch (sortby) {
      case "newest":
        sortCriteria = { createdAt: -1 }; // Descending order
        break;
      case "oldest":
        sortCriteria = { createdAt: 1 }; // Ascending order
        break;
      case "price-low-high":
        sortCriteria = { price: 1 }; // Ascending order
        break;
      case "price-high-low":
        sortCriteria = { price: -1 }; // Descending order
        break;
      default:
        sortCriteria = {}; // Default: no sorting
    }

    // Get product count
    const count = await Product.find(query).countDocuments();

    // Fetch products with pagination and sorting
    const products = await Product.find(query)
      .sort(sortCriteria) // Apply sorting
      .limit(products_per_page)
      .skip(products_per_page * (page - 1))
      .select("name slug shortDescription category company price images");

    // Fetch related data for each product
    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        const category = await Category.findById(product.category).lean();
        const company = await Company.findById(product.company).lean();
        const image = await Media.findById(product.images[0] || "").lean();

        return {
          ...product.toObject(),
          _id: product._id.toString(),
          category: category
            ? { ...category, _id: category._id.toString() }
            : null,
          company: company ? { ...company, _id: company._id.toString() } : null,
          image: image ? { ...image, _id: image._id.toString() } : null,
        };
      })
    );

    return { count, products: enrichedProducts };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Failed to fetch products!");
  }
};


