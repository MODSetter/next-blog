import { getPostBySlug } from "../../db/getters";
import type { Metadata } from "next";
import sitemap from "../sitemap";
import NavBar from "@/components/nav-bar";

interface BlogPostPageProps {
  params: { postslug: string };
}

export async function generateMetadata({
  params: { postslug },
}: BlogPostPageProps): Promise<Metadata> {
  //get post data of this postId
  const post = await getPostBySlug(postslug);

  return {
    title: post?.title,
    description: post?.metaDescription,
    keywords: post?.metaKeywords,
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
  const post = await getPostBySlug(postslug);
  {
    /* <p className="text-lg" dangerouslySetInnerHTML={ { __html: post ? post.content: "empty" } }></p> */
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 border m-4 rounded-xl">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl font-semibold">{post?.title}</h1>
          <div
            className="text-lg p-2"
            dangerouslySetInnerHTML={{
              __html: post ? post.content : "404 Error",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
