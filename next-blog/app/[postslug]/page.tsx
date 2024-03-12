import {getPostIdWithSlug, getPostWithPostId} from "../../db/getters"
import type { Metadata } from "next";
import sitemap from "../sitemap";

interface BlogPostPageProps {
    params: { postslug: string };
}

export async function generateMetadata({
  params: { postslug },
}: BlogPostPageProps): Promise<Metadata> {

   //Get postId of this slug
   const postId = await getPostIdWithSlug(postslug)

   //get post data of this postId
   const post = await getPostWithPostId(postId)

  return {
    title: post?.title,
    description: post?.metaDescription,
    keywords: post?.metaKeywords
    //Dynamic Image Generation Code Here
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
  };
}

export default async function BlogPostPage({
    params: { postslug },
  }: BlogPostPageProps) {
    console.log(postslug)
    if(postslug==="sitemap.xml"){
      return sitemap
    }
    //Get postId of this slug
    const postId = await getPostIdWithSlug(postslug)

    //get post data of this postId
    const post = await getPostWithPostId(postId)


    return (
      <article className="max-w-prose m-auto space-y-5">
        {postslug}
        <h1 className="text-3xl text-center font-bold">{post?.title}</h1>
        <p className="text-lg" dangerouslySetInnerHTML={ { __html: post ? post.content: "empty" } }></p>
      </article>
    );
  }