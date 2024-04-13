import React from "react";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "./theme-toggle";

const NavBar = () => {
  return (
    <Alert className="flex justify-between">
      <div>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Next-Blog</AlertTitle>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </Alert>
  );
};

export default NavBar;
