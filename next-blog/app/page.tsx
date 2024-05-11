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
    } else if (index == 0) {
      return (
        <TestNav />
        // <NavBar />
      );
    }
  };

  return (
    <>
      {/* <div className="fixed left-0 top-0 -z-10 h-full w-full hidden dark:block">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      </div> */}
      <ThemeToggle />
      <div className="flex flex-col gap-4 h-screen justify-between bg-lightImage dark:bg-darkImage">
        <div>{getNavbar(user?.maingrid)}</div>
        <div className="grow container mx-auto p-4">
          <DefaultGrid />
          {/* <SecondGrid /> */}
          {/* <ThirdGrid /> */}
          {/* <FourthGrid /> */}
          {/* <FifthGrid /> */}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
