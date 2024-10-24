import type { Metadata } from "next";
import "@/styles/global.css";
import Navbar from "@/components/navbar/navbar";
import { BodyContainer } from "@/styles/style";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/providers";

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
          <BodyContainer>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </BodyContainer>
        </Providers>
      </body>
    </html>
  );
}
