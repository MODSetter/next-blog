import React from "react";
import Link from "next/link";

interface PostMetaData {
  title: string;
  opengraphimage: string;
  slug: string;
  updatedAt: Date;
  metaDescription: string | null;
  views: number;
}
[];

async function allPostMetaDataRequest() {
  let cacheValidateAt = 5; //Default Cache Timeout
  if (`${process.env.HOMEPAGE_CACHE_REVALIDATE}`) {
    cacheValidateAt = parseInt(`${process.env.HOMEPAGE_CACHE_REVALIDATE}`);
  } else {
    console.log("Wrong Home Cache Vals in Env");
  }
  const response = await fetch(`${process.env.PUBLIC_BASE_URL}/api/posts`, {
    next: { revalidate: cacheValidateAt },
  });
  return response.json();
}

const PostList = async () => {
  const allPostMetaData = await allPostMetaDataRequest();
  // const allPostMetaDat = await getPostsMetaWithPostSlug();
  // console.log("POSTLIST",allPostMetaData);

  return (
    <>
      <div className="border rounded-3xl py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Introducing Next-Blog
            </h2>

            <ul className="list-disc mx-8 mt-2 text-lg leading-8 ">
              <li>Server Side Rendered pages with caching</li>
              <li>SEO Friendly</li>
              <li>Blazing fast(100 Lighthouse score)</li>
              <li>Notion-style WYSIWYG editor with AI assistant.</li>
              <li>Open AI Support</li>
              <li>Vercel Blob Support</li>
              <li>Modern UI</li>
              <li>Admin Dashboard</li>
            </ul>
          </div>
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allPostMetaData.map(
              ({
                slug,
                opengraphimage,
                title,
                metaDescription,
                updatedAt,
                views,
              }: PostMetaData) => (
                // bg-slate-100/5
                <article className="backdrop-blur-md bg-white/10  flex max-w-xl flex-col items-start justify-between border rounded-2xl p-8 ">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="">
                      {(new Date(updatedAt)).toDateString()}
                    </time>
                    <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      Views : {views}
                    </p>
                  </div>

                  <div className="group relative">
                    <Link href={`/${slug}`}>
                      <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-zinc-500">
                        <span className="absolute inset-0"></span>
                        {title}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6">
                        {metaDescription}
                      </p>
                    </Link>
                  </div>

                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold">
                        <span className="absolute inset-0"></span>
                        Rohan
                      </p>
                      <p>Admin</p>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostList;
