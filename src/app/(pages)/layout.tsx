import type { Metadata } from "next";
import "@/styles/global.css";
import { BodyContainer } from "@/styles/style";
import Footer from "@/components/footer";
import Navbar from "../../components/Navbar";
export const metadata: Metadata = {
  title: "PetsHouse",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BodyContainer>
      <Navbar />
      {children}
      <Footer />
    </BodyContainer>
  );
}
