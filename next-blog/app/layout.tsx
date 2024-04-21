import "@/styles/globals.css";
import "@/styles/prosemirror.css";


import type { Metadata } from "next";
import { Inter,Roboto,Montserrat } from "next/font/google";


import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/components/nav-bar";
import Footer from "@/components/Footer";

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
    <html lang="en" suppressHydrationWarning>
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
