import type { Metadata } from "next";
import "@/styles/global.css";
import { BodyContainer } from "@/styles/style";

export const metadata: Metadata = {
  title: "PetsHouse",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BodyContainer>{children}</BodyContainer>;
}
