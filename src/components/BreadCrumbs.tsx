"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation"; // Import usePathname

const BreadCrumbs = () => {
  const pathname = usePathname(); // Get current path
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="w-screen h-10 flex ml-11 sticky top-0 backdrop-filter backdrop-blur-lg bg-white bg-opacity-50 z-10">
      <BreadcrumbList className="flex flex-row text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={to}>{value}</BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
