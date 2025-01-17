import type { Metadata } from "next";
import "@/styles/global.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/providers";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
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
