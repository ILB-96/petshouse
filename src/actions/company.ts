"use server";
import { connectDB } from "@/lib/database";
import { Cart } from "@/models/Cart";
import { Company } from "@/models/Company";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// Better type definition instead of `any`
interface CompanyValues {
  name: string;
  url: string;
}

export const createCompany = async (values: CompanyValues) => {
  const { name, url } = values;

  try {
    await connectDB();

    // Check if user already exists
    const companyFound = await Company.findOne({ name });
    if (companyFound) {
      return {
        message: "Company already exists!",
        error: "Company already exists!",
      };
    }

    // Create cart and user
    const company = new Company({
      name,
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
