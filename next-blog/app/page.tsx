import Footer from "@/components/Footer";
import { DefaultGrid } from "@/components/homepage/grids/DefaultGrid";
import { FifthGrid } from "@/components/homepage/grids/FifthGrid";
import { FourthGrid } from "@/components/homepage/grids/FourthGrid";
import { SecondGrid } from "@/components/homepage/grids/SecondGrid";
import { ThirdGrid } from "@/components/homepage/grids/ThirdGrid";
import TestNav from "@/components/homepage/navbars/TestNav";
import NavBar from "@/components/nav-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUser } from "@/db/getters";

export default async function Home() {
  const user = await getUser();
  const getNavbar = (index: number | undefined) => {
    if (index == 1) {
      return (
        <NavBar />
      );
    } else if (index == 2) {
      return (
        <TestNav />
        // <NavBar />
      );
    }
  };

  return (
    <>
      <ThemeToggle />
      <div className="flex flex-col gap-4 h-screen justify-between">
        <div>{getNavbar(user?.maingrid)}</div>
        <div className="grow container mx-auto p-4">
          {/* <DefaultGrid /> */}
          {/* <SecondGrid /> */}
          {/* <ThirdGrid /> */}
          {/* <FourthGrid /> */}
          <FifthGrid />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
