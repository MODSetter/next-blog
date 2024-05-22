import "@/styles/globals.css";
import "@/styles/prosemirror.css";

import { footerProvider } from "@/components/homepage/footers/footer-provider";
import { navBarProvider } from "@/components/homepage/navbars/navbar-provider";



import type { Metadata } from "next";
import { Inter, Roboto, Montserrat, Figtree } from "next/font/google";

import { getBackground } from "@/components/next-toggle/background-provider"
import { getUser } from "@/db/getters";


import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Figtree({ weight: "300", subsets: ["latin"] });

//Homepage Metas - can define template in title
export const metadata: Metadata = {
  title: "Next Blog",
  description: "SEO optimized CMS.",
  twitter: {
    card: "summary_large_image",
  },
  keywords: ["Next", "Blog", "SEO", "Fast"]
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
        <div className="hidden dark:block fixed left-0 top-0 -z-10 h-full w-full">
          {getBackground(user?.defaultDark)}
        </div>
        <div className="block dark:hidden fixed left-0 top-0 -z-10 h-full w-full">
          {getBackground(user?.defaultLight)}
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col gap-4 h-screen justify-between">
            <div className="sticky top-0 left-0 z-50">
              {navBarProvider(user?.navbar)}
            </div>
            <div className="grow container mx-auto p-4">
              {children}
            </div>


            {footerProvider(user?.footer)}

          </div>

        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
