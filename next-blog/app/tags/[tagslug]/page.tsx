import prisma from "@/db/prismaclient"
import Link from "next/link"
import Giscus from '@giscus/react'
import ImageUploadForm from "@/components/image-upload/ImageUploadForm";

interface TagPagesProps {
  params: { tagslug: string };
}


export const PostsPage = async ({
  params: { tagslug },
}: TagPagesProps) => {

  return (
    <div>
      TAGS PAGE ARE CURRENTLY IN DEVELOPMENT
    </div>
  )
}

export default PostsPage;