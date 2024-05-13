import Footer from "@/components/Footer";
import { gridProvider } from "@/components/homepage/grids/grids-provider";
import NavbarOne from "@/components/homepage/navbars/navbar-one";
import { ThemeToggle } from "@/components/next-toggle/theme-toggle";
import { getUser } from "@/db/getters";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-col gap-4 h-screen justify-between bg-lightImage dark:bg-darkImage">
        <div className="sticky top-0 left-0 z-50">
          <NavbarOne />
        </div>
        <div className="grow container mx-auto p-4">
          {gridProvider(user?.maingrid)}
        </div>

        <div>
          <Footer />
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
