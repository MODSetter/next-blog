import { Button } from "@/components/ui/button";
import AllPosts from "../../ui/dashboard/AllPosts";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <AllPosts />
      <Link href={'/dashboard/posts/new'}>
      <Button>Create New Post</Button>
      </Link>
      
    </div>
  );
};

export default page;
