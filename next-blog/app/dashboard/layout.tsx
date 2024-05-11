import { ThemeToggle } from "@/components/next-toggle/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CircleFadingPlus,
  Home,
  LayoutDashboard,
  Menu,
  Rss,
  Settings,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest, onLogout } from "@/actions/auth.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Rss className="h-6 w-6" />
              <span className="">Next-Blog</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href={'/dashboard'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href={'/dashboard/posts'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <CircleFadingPlus className="h-4 w-4" />
                Posts & Pages
              </Link>
              <Link
                href={'/dashboard/tags'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Tags className="h-4 w-4" />
                Tags
              </Link>
              <Link
                href={'/dashboard/settings'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <LayoutDashboard className="h-4 w-4" />
                Themes & Layout
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardDescription>My Account</CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <form action={onLogout}>
                  <Button size="sm" className="w-full">
                    Log Out
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href={'/'}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Rss className="h-6 w-6" />
                  <span>Next-Blog</span>
                </Link>
                <Link
                  href={'/dashboard'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href={'/dashboard/posts'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <CircleFadingPlus className="h-5 w-5" />
                  Posts & Pages
                </Link>
                <Link
                  href={'/dashboard/tags'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Tags className="h-5 w-5" />
                  Tags
                </Link>
                <Link
                  href={'/dashboard/settings'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Themes & Layout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
