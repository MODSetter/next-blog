import { Button } from "@/components/ui/button";
import Link from "next/link";
import AllPosts from "@/app/ui/dashboard/AllPosts";

const page = () => {
  // const content = window.localStorage.getItem("novel-html");
  // console.log("At Load Saved Data",content);
  return (
    // <TailwindAdvancedEditor />
    <div className="flex flex-col h-screen">
      <AllPosts />
      <Link href={"/dashboard/posts/new"}>
        <Button>Create New Post</Button>
      </Link>
    </div>
  );
};

export default page;
