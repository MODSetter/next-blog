import Footer from "@/components/Footer";
import { gridProvider } from "@/components/homepage/grids/grids-provider";
import { ThemeToggle } from "@/components/next-toggle/theme-toggle";
import { getUser } from "@/db/getters";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <ThemeToggle />
      <div className="flex flex-col gap-4 h-screen justify-between bg-lightImage dark:bg-darkImage">
        <div>NAVBAR</div>
        <div className="grow container mx-auto p-4">
          {gridProvider(user?.maingrid)}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
