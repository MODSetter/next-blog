"use client"
import Giscus from '@giscus/react'
import PostMetaData from "@/components/homepage/common-interfaces";
import { useEffect, useState } from "react";
import postCardProvider from "@/components/homepage/postscards/postcard-provider";

interface DiscussionPageProps {
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



export const Page = ({
    params: { postslug },
}: DiscussionPageProps) => {
    const [postdata,setPostdata]  = useState<PostMetaData>();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getpostbyslug/${postslug}`)
          .then(response => response.json())
          .then(data => {
            console.log("POST",data)
            setPostdata(data);
          })
      }, []);

    return (
        <div className="flex flex-col m-8">
            <div className='max-w-30 mb-6'>
                {postCardProvider("LG-2", postdata)}
            </div>
            <div className="bg-slate-500/80 p-4 rounded-lg">
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
                    theme="preferred_color_scheme"
                    lang="en"
                    loading="lazy"
                />
            </div>
        </div>
    )
}

export default Page;