import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <>
    <Navbar />
    {/* get all post slugs-postid */}
    <PostList />
    </>
  );
}
