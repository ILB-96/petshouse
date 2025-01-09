"use server";
import { connectDB } from "@/lib/database";
import { ICompany } from "@/models/Company";
import { Company } from "@/models";
import { revalidatePath } from "next/cache";

export const createCompany = async (values: ICompany) => {
  const { name, slug, url } = values;

  try {
    await connectDB();

    // Check if user already exists
    const companyFound = await Company.findOne({ slug });
    if (companyFound) {
      return {
        message: "Company already exists!",
        error: "Company already exists!",
      };
    }

    // Create cart and user
    const company = new Company({
      name,
      slug,
      url,
    });

    // Save both cart and user concurrently
    await company.save();

    return {
      message: "Company registered successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
};

export const editCompany = async (values: ICompany) => {
  const { name, slug, url } = values;

  try {
    await connectDB();

    // Check if user already exists
    const company = await Company.findOne({ name });
    if (!company) {
      return {
        message: "Category slug doesn't exists!",
        error: "Category slug doesn't exists!",
      };
    }

    company.name = name;
    company.slug = slug;
    company.url = url;
    await company.save();

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

export const findOneCompany = async (slug: string) => {
  try {
    await connectDB();
    const company = await Company.findOne({ slug }).lean();
    return { ...company, _id: company?._id.toString() };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
export const findAllCompaniesSlug = async () => {
  try {
    await connectDB();
    const companies = await Company.find({ deletedAt: null }).lean();
    return companies.map((company) => ({
      ...company,
      _id: company._id.toString(),
    }));
  } catch (e: unknown) {
    console.error("Error finding companies:", e);
    return null;
  }
};

export const getCompanies = async (
  q: string | RegExp,
  page: number,
  categories_per_page: number
) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const count = await Company.find({
      slug: { $regex: regex },
      deletedAt: null,
    }).countDocuments();
    const companies = await Company.find({
      slug: { $regex: regex },
      deletedAt: null,
    })
      .limit(categories_per_page)
      .skip(categories_per_page * (page - 1));
    return { count, companies };
  } catch (err) {
    throw new Error("Failed to fetch companies!");
  }
};

export const deleteCompany = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { slug } = Object.fromEntries(formData);

  try {
    connectDB();
    const company = await Company.findOne({ slug });
    company.deletedAt = new Date();
    await company.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete company!");
  }

  revalidatePath("/admin/companies");
};
