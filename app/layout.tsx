import "./css/style.css";

import { Inter, Architects_Daughter, Montserrat } from "next/font/google";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import { HuxApiServiceProvider } from "@/context/HuxApiServiceContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Contact Guard",
  description: "Keeping Your Contacts Safe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      
      <body
        className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-[#F8F9FA] text-[#2C3E50] tracking-tight`}
      >
        <Toaster />
        <HuxApiServiceProvider>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            {children}
            {/* <Banner /> */}
          </div>
        </HuxApiServiceProvider>
      </body>
    </html>
  );
}
