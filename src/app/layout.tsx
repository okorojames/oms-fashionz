import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import RootClientLayout from "@/components/base-components/RootClientLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OMS Fashions",
  description:
    "OMS Fashions, where you buy can go through our latest hot trending fashions on Shoes, foot wears, Clothes, etc..., make a request for it, and have it delivered to your door step within 24 hours.",
  icons: {
    icon: "/oms-logo.png",
  },
  manifest: "/manifest.json",
  keywords: [
    "OMS Fashions",
    "Shoes",
    "FootWears",
    "Clothes",
    "Accessories",
    "Bags",
    "Jewellery",
  ],
  twitter: {
    card: "summary_large_image",
    title: "OMS Fashions",
    description:
      "OMS Fashions, where you buy can go through our latest hot trending fashions on Shoes, foot wears, Clothes, etc..., make a request for it, and have it delivered to your door step within 24 hours.",
    creator: "@okorojamees_",
    site: "",
    images: ["https://oms-fashion.vercel.app/home-previews.jpg"],
  },
  openGraph: {
    title: "OMS Fashions",
    description:
      "OMS Fashions, where you buy can go through our latest hot trending fashions on Shoes, foot wears, Clothes, etc..., make a request for it, and have it delivered to your door step within 24 hours.",
    url: "https://oms-fashion.vercel.app/",
    siteName: "OMS Fashions",
    images: [
      {
        url: "https://oms-fashion.vercel.app/home-previews.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <RootClientLayout>
          <main className="max-w-[1440px] mx-auto">{children}</main>
        </RootClientLayout>
      </body>
    </html>
  );
}
