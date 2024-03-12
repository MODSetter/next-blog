import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

//Homepage Metas - can define template in title
export const metadata: Metadata = {
  title: "Next Blog",
  description: "SEO optimized CMS.",
  twitter: {
    card: "summary_large_image",
  },
  keywords: ["Next","Blog","SEO","Fast"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
