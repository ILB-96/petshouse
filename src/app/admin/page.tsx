"use client";
import React from "react";

import { Icons } from "@/components/icons"; // Import your icons here or use a library like FontAwesome
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainContainer, SectionContainer } from "@/styles/style";

const AdminDashboard = () => {
  const actions = [
    {
      name: "Products",
      slug: "products",
      // icon: <Icons.productAdd />,
    },
    {
      name: "Companies",
      // icon: <Icons.companyAdd />,
      slug: "companies",
    },
    {
      name: "Categories",
      // icon: <Icons.categoryAdd />,
      slug: "categories",
    },
    {
      name: "Orders",
      // icon: <Icons.orders />,
      slug: "orders",
    },
    {
      name: "Users",
      // icon: <Icons.users />,
      slug: "users",
    },
    {
      name: "Media",
      // icon: <Icons.users />,
      slug: "media",
    },
  ];

  return (
    <MainContainer className="bg-gray-100 min-h-screen">
      <SectionContainer className=" bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-700 px-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
          {actions.map((action) => (
            <Button
              key={action.slug}
              className="bg-blue-500 text-white flex items-center p-6 rounded-lg shadow hover:bg-blue-700 transition duration-200"
              asChild
            >
              <Link href={`/admin/${action.slug}`}>
                <span className="text-lg font-semibold">{action.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default AdminDashboard;
