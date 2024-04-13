import { Dashboard } from "@/components/DashTest";
import NavBar from "@/components/nav-bar";
import PostTest from "@/components/PostTest";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
    <NavBar />
      <div className="container mx-auto p-4">
        <PostTest />
      </div>
    </>
  );
}
