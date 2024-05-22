import { gridProvider } from "@/components/homepage/grids/grids-provider";
import { getUser } from "@/db/getters";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      {gridProvider(user?.maingrid)}
    </>
  );
}
