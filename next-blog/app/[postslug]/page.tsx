import type { Metadata } from "next";
import { incView } from "@/db/setters";
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import parameterize from 'parameterize';
import { visit } from 'unist-util-visit';
import { CirclePlus, MessageCircle, SmilePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { createDiscusionForPostSlug } from "@/utils/common-functions";
import NotFound from "../not-found";
import Link from "next/link";


interface BlogPostPageProps {
  params: { postslug: string };
}

interface Post {
  slug: string;
  opengraphimage: string;
  title: string;
  content: string;
  updatedAt: Date;
  metaDescription: string | null;
  metaKeywords: string[];
  views: number;
  authorId: number;
  tags: any[];
  author: any;
}

async function getPostBySlug(postslug: string) {
  let cacheValidateAt = 5 //Default Cache Timeout
  if (`${process.env.POSTS_CACHE_REVALIDATE}`) {
    cacheValidateAt = parseInt(`${process.env.POSTS_CACHE_REVALIDATE}`);
  } else {
    console.log("Wrong Post Cache Vals in Env")
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getpostbyslug/${postslug}`, {
    next: { revalidate: cacheValidateAt },
  });
  return response.json();
}

async function getDiscussionsStats(postslug: string) {
  let cacheValidateAt = 5 //Default Cache Timeout
  if (`${process.env.DISCUSSIONS_STATS_REVALIDATE}`) {
    cacheValidateAt = parseInt(`${process.env.DISCUSSIONS_STATS_REVALIDATE}`);
  } else {
    console.log("Wrong Discussion Cache Vals in Env")
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discussions/stats/${postslug}`, {
    next: { revalidate: cacheValidateAt },
  });
  return response.json();
}

export async function generateMetadata({
  params: { postslug },
}: BlogPostPageProps): Promise<Metadata> {
  //get post data of this postId
  const post: Post = await getPostBySlug(postslug);


  return {
    title: post?.title,
    description: post?.metaDescription,
    keywords: post?.metaKeywords,
    //Dynamic Image Generation Code Here
    openGraph: {
      images: [
        {
          url: post?.opengraphimage
        }
      ],
    },
  };
}

export default async function BlogPostPage({
  params: { postslug },
}: BlogPostPageProps) {
  const post: Post = await getPostBySlug(postslug);
  const discussion = await getDiscussionsStats(postslug);

  if(post.slug){
    incView(postslug);
    await createDiscusionForPostSlug(`${process.env.NEXT_PUBLIC_BASE_URL}/discussions/${postslug}`)
  }else{
    return <NotFound />
  }
  

  //contains toc 
  const toc: any = [];

  //Add TOC ids to content html
  const contentWithToc = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(() => {
      return (tree) => {
        visit(tree, 'element', function (node: any) {
          if (node.tagName === 'h2') {
            const id = parameterize(node.children[0].value);
            node.properties.id = id;

            toc.push({
              id,
              title: node.children[0].value,
            });
          }
        });
        return;
      }
    })
    .use(rehypeStringify)
    .processSync(post.content)
    .toString();

  return (
    <>
      <div className="container mx-auto p-4 border m-4 rounded-xl bg-white/10 backdrop-blur-lg">
        <div className="flex flex-col gap-y-4 m-4">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">{post?.title}</h1>

              <div className="italic underline text-xs">{(new Date(post.updatedAt)).toDateString()}</div>
            </div>

            <div className="flex items-center gap-x-4">
              <img
                src={post.author.avatar}
                alt="author"
                className="h-10 w-10 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold">
                  {/* <span className="absolute inset-0"></span> */}
                  {post.author.name}
                </p>
                <p>Admin</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-between md:flex-row">
            <div>
              <div className="bg-white/10 backdrop-blur-lg border hover:text-black hover:bg-gradient-to-r hover:from-pink-100 hover:to-yellow-100 rounded-2xl p-4 sticky top-20 left-0 z-50 min-w-40">
                <p className="border-b-2 py-2 mb-2 text-lg font-semibold">On This Page</p>
                <ul>
                  {toc.map(({ id, title }: { id: any, title: any }) => {
                    return (
                      <li key={id} className="text-sm">
                        <a href={`#${id}`}>
                          {title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div
              className="tiptap ProseMirror prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
              dangerouslySetInnerHTML={{
                __html: post ? contentWithToc : "Not Found",
              }}
            ></div>

            <div>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/discussions/${postslug}`}>
              <div className="flex md:flex-col gap-2 place-items-center justify-around bg-white/10 backdrop-blur-lg border hover:text-black hover:bg-gradient-to-r hover:from-pink-100 hover:to-yellow-100 p-4 rounded-full sticky top-20 left-0 z-50">
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div>
                          <MessageCircle className="h-4 w-4" />
                          {discussion.comments}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Post Comments</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div>
                          <SmilePlus className="h-4 w-4" />
                          {discussion.reactions}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Post Reactions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div>
                        <CirclePlus className="" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Participate in Post Discussion
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>


              </div>
              </Link>
            </div>

          </div>



        </div>
      </div>
    </>
  );
}
