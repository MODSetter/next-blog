import prisma from "@/db/prismaclient"
import Link from "next/link";

interface TagPagesProps {
  params: { tagslug: string };
}


export const PostsPage = async ({
    params: { tagslug },
  }: TagPagesProps) => {

  return (
    <div>
        TAGS for {tagslug}
    </div>
  )
}

export default PostsPage;