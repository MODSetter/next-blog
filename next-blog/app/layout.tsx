import type { Metadata } from "next";
import { Inter,Roboto,Montserrat } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"

const inter = Montserrat({ weight: "300", subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
