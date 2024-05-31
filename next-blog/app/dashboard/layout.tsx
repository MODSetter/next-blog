import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CircleFadingPlus,
  Home,
  LayoutDashboard,
  Menu,
  Palette,
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
      <div className="hidden border-r bg-muted/40 backdrop-blur-lg md:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Rss className="h-6 w-6" />
              <span className="">Management Dashboard</span>
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
                href={'/dashboard/posts/1'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <CircleFadingPlus className="h-4 w-4" />
                Posts & Pages
              </Link>
              <Link
                href={'/dashboard/user/themes'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Palette className="h-4 w-4" />
                Themes
              </Link>
              <Link
                href={'/dashboard/user/sitelayout/navfooter'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <LayoutDashboard className="h-4 w-4" />
                Layout & Components
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4 sticky bottom-0 left-0 z-50">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardDescription>My Account</CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link href={"/dashboard/user/settings"}>
                  <Button size="sm" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Button>
                </Link>
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
        <header className="flex h-14 items-center gap-4 border bg-muted/40 backdrop-blur-lg px-4 lg:h-[60px] lg:px-6">
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
                  <span>Management Dashboard</span>
                </Link>
                <Link
                  href={'/dashboard'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href={'/dashboard/posts/1'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <CircleFadingPlus className="h-5 w-5" />
                  Posts & Pages
                </Link>
                <Link
                  href={'/dashboard/user/themes'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Palette className="h-5 w-5" />
                  Themes
                </Link>
                <Link
                  href={'/dashboard/user/sitelayout/navfooter'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Layout & Components
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 border lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
