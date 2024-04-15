import Footer from "@/components/Footer";
import NavBar from "@/components/nav-bar";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <NavBar />
        <div className="grow container mx-auto p-4">
          <PostList />
        </div>
        <Footer />
      </div>
    </>
  );
}
