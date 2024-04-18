import React from "react";
import { Terminal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

const NavBar = () => {
  return (
    <Alert className="flex justify-between">
      <div>
        <Link href="/">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Next-Blog</AlertTitle>
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="flex max-w-sm items-center space-x-2">
          <Input className="rounded-lg" placeholder="Search..." type="search" />
          <Button variant="outline" className="rounded-lg" type="submit">
          <Search size={16}/>
          </Button>
        </div>
        <Separator orientation="vertical" />
        <Button variant="outline">About Us</Button>
        <Link href={"/dashboard"}>
          <Button variant="outline">Login</Button>
        </Link>
        <Separator orientation="vertical" />
        <ThemeToggle />
      </div>
    </Alert>
  );
};

export default NavBar;

//bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200
