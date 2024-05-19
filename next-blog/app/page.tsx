import Footer from "@/components/homepage/footers/footer-one";
import { footerProvider } from "@/components/homepage/footers/footer-provider";
import { gridProvider } from "@/components/homepage/grids/grids-provider";
import { navBarProvider } from "@/components/homepage/navbars/navbar-provider";
import { getUser } from "@/db/getters";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-col gap-4 h-screen justify-between">
        <div className="sticky top-0 left-0 z-50">
          {navBarProvider(user?.navbar)}
        </div>
        <div className="grow container mx-auto p-4">
          {gridProvider(user?.maingrid)}
        </div>

        <div>
          {footerProvider(user?.footer)}
        </div>
      </div>
    </>
  );
}
