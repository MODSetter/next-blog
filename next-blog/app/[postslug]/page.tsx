import type { Metadata } from "next";
// import sitemap from "../sitemap";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/homepage/footers/footer-one";
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
  //Increment the view of Post
  incView(postslug);

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
      <div className="flex flex-col justify-between h-screen">
        <NavBar />
        <div className="grow container mx-auto p-4 border m-4 rounded-xl bg-white/10 backdrop-blur-lg">
          <div className="flex flex-col gap-y-4 m-4">
            <div className="flex justify-between items-center p-4 border-b border-dashed border-gray-200">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">{post?.title}</h1>

                <div className="italic underline text-xs">{(new Date(post.updatedAt)).toDateString()}</div>
              </div>

              <div className="flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold">
                    {/* <span className="absolute inset-0"></span> */}
                    Rohan
                  </p>
                  <p>Admin</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-between md:flex-row">
              <div>
                <div className="bg-white/10 backdrop-blur-lg hover:bg-gradient-to-r hover:from-pink-300 hover:to-yellow-300 rounded-2xl p-4 sticky top-8 left-0 z-50 min-w-40">
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
                <div className="flex md:flex-col gap-2 place-items-center justify-around bg-white/10 backdrop-blur-lg hover:bg-gradient-to-r hover:from-pink-300 hover:to-yellow-300 p-4 rounded-lg sticky top-8 left-0 z-50">
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div>
                            <MessageCircle className="h-4 w-4" />
                            2543
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
                            3242
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
                          <p>Participate in Post Discussion</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </div>


                </div>

              </div>

            </div>



          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
