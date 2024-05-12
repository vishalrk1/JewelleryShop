import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navBar";
import { ReduxProvider } from "@/provider/redux-provider";
import { ToasterProvider } from "@/provider/toast-provider";
import Footer from "@/components/footer";

const Poopins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Illusion Jwel",
  description: "Discover our latest and greatest jewelry pieces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={Poopins.className}>
        <ReduxProvider>
          <ToasterProvider />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
