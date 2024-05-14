"use client"
import prisma from "@/db/prismaclient"
import Link from "next/link"
import Giscus from '@giscus/react'

interface TagPagesProps {
  params: { tagslug: string };
}


export const PostsPage = async ({
  params: { tagslug },
}: TagPagesProps) => {

  return (
    <div>
      <Giscus
        id="comments"
        repo="MODSetter/giscustest"
        repoId="R_kgDOL6wIwA"
        category="Announcements"
        categoryId="DIC_kwDOL6wIwM4CfUUs"
        mapping="url"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark_dimmed"
        lang="en"
        loading="lazy"
      />
    </div>
  )
}

export default PostsPage;