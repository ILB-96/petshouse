import type { Metadata } from "next";
import "@/styles/global.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/providers";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

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
    <html>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
          <Footer
        </Providers>
      </body>
    </html>
  );
}
