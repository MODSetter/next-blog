import { Dashboard } from "@/components/DashTest";
import Footer from "@/components/Footer";
import NavBar from "@/components/nav-bar";
import PostList from "@/components/PostList";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <NavBar />
        <div className="container mx-auto p-4">
          <PostList />
        </div>
        <Footer />
      </div>
    </>
  );
}
