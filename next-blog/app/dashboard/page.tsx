"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Settings,
  CircleFadingPlus,
  Rss,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import PostManagement from "./components/PostManagement";
import { SetStateAction, useEffect, useState } from "react";
import Analytics from "./components/Analytics";
import MySettings from "./components/MySettings";
import MyDashBoard from "./components/MyDashBoard";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import { useRouter } from "next/router";

import postpic from "../../public/images/unnamed.png";
import Image from "next/image";
import { JsonObject } from "@prisma/client/runtime/library";
import AllPosts from "./components/AllPosts";
import prisma from "../../db/prismaclient";

export interface Post {
  slug: string;
  opengraphimage: string;
  title: string;
  updatedAt: Date;
  metaDescription: string | null;
  views: number;
}

export default function Dashboard() {
  const [toggleTab, setToggleTag] = useState(0);

  const currentTab = (index: SetStateAction<number>) => {
    console.log(index);
    setToggleTag(index);
  };


  // const [allposts, setAllposts] = useState<Post[]>(null);
  // useEffect(() => {
  //   fetch('/api/posts/getallposts')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setAllposts(data)
  //       // setLoading(false)
  //     })
  // }, [])

  // const alpostdata = await fetch('/api/posts/getallposts')
  // fetch('/api/posts/getallposts')
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error('Error:', error));
  // console.log(alpostdata)
 

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Rss className="h-6 w-6" />
              <span className="">Next-Blog</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                onClick={() => currentTab(0)}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                onClick={() => currentTab(1)}
              >
                <CircleFadingPlus className="h-4 w-4" />
                Posts
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                onClick={() => currentTab(2)}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                onClick={() => currentTab(3)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Rss className="h-6 w-6" />
                  <span>Next-Blog</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => currentTab(0)}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => currentTab(1)}
                >
                  <CircleFadingPlus className="h-5 w-5" />
                  Posts
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => currentTab(2)}
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => currentTab(3)}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {toggleTab === 0 ? <MyDashBoard /> : null}
          {toggleTab === 1 ? <AllPosts /> : null}
          
          
          {/* <Button onClick={() => currentTab(4)}>Create New Post</Button> */}

          <div className={toggleTab === 2 ? "" : "hidden"}>
            <Analytics />
          </div>

          <div className={toggleTab === 3 ? "" : "hidden"}>
            <MySettings />
          </div>

          <div className={toggleTab === 4 ? "" : "hidden"}>
            <NewPost />
          </div>

          <div className={toggleTab === 5 ? "" : "hidden"}>
            {/* <EditPost /> */}
          </div>
        </main>
      </div>
    </div>
  );
}

// Dashboard.getInitialProps = ({ query: { id } }) => {
//   return { id }
// }
