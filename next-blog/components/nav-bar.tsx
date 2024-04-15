import React from "react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

const NavBar = () => {
  return (
    <Alert className="flex justify-between bg-sky-500/10">
      <div>
        <Link href="/">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Next-Blog</AlertTitle>
        </Link>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">About Us</Button>
        <Link href={"/dashboard"}>
          <Button variant="outline">Login</Button>
        </Link>
        <ThemeToggle />
      </div>
    </Alert>
  );
};

export default NavBar;