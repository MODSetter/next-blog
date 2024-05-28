import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const UserLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <>
    <div className="flex min-h-screen w-full flex-col gap-4">
      <header className="sticky top-0 flex h-16 items-center gap-4 border bg-muted/50 rounded-3xl px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard/user/sitelayout/navfooter"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Navbar/Footer
          </Link>
          <Link
            href="/dashboard/user/sitelayout/grids"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Grid
          </Link>
          <Link
                href="/dashboard/user/sitelayout/components"
                className="text-muted-foreground hover:text-foreground"
              >
                Select Components
              </Link>

              <Link
                href="/dashboard/user/sitelayout/components/new"
                className="text-muted-foreground hover:text-foreground"
              >
                <p className="backdrop-blur-lg bg-emerald-400/10 px-4 py-2 rounded-full">Create a New Component</p>
              </Link>
        </nav>
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
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard/user/sitelayout/navfooter"
                className="text-muted-foreground hover:text-foreground"
              >
                Navbar/Footer
              </Link>
              <Link
                href="/dashboard/user/sitelayout/grids"
                className="text-muted-foreground hover:text-foreground"
              >
                Grid
              </Link>
              <Link
                href="/dashboard/user/sitelayout/components"
                className="text-muted-foreground hover:text-foreground"
              >
                Select Components
              </Link>

              <Link
                href="/dashboard/user/sitelayout/components/new"
                className="text-muted-foreground hover:text-foreground"
              >
                <Button>Create a New Component</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
      </header>
      {children}
    </div>
    </>
  );
};

export default UserLayout;
