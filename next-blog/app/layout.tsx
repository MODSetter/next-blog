import "@/styles/globals.css";
import "@/styles/prosemirror.css";


import type { Metadata } from "next";
import { Inter,Roboto,Montserrat, Figtree } from "next/font/google";

import { getBackground } from "@/components/next-toggle/background-provider"
import { getUser } from "@/db/getters";


import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
 
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <div className="hidden dark:block">
        {getBackground(user?.defaultDark)}
      </div>
      <div className="block dark:hidden">
        {getBackground(user?.defaultLight)}
      </div>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
      </body>
    </html>
  );
}
