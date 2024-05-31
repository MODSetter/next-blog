"use client"
import Giscus from '@giscus/react'
import PostMetaData from "@/components/homepage/common-interfaces";
import { useEffect, useState } from "react";
import postCardProvider from "@/components/homepage/postscards/postcard-provider";
import NotFound from '@/app/not-found';

interface DiscussionPageProps {
    params: { postslug: string };
}


export const DiscussionPage = ({
    params: { postslug },
}: DiscussionPageProps) => {
    const [postdata, setPostdata] = useState<PostMetaData>();
    const [loaddiscussion, setLoaddiscussion] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getpostbyslug/${postslug}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.slug) {
                    setPostdata(data);
                }
            })


            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discussions/${postslug}`)
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    setLoaddiscussion(true);
                }
            })
    }, []);

    if (loaddiscussion) {
        return (
            <div className="flex flex-col m-8">
                <div className='max-w-30 mb-6'>
                    {postCardProvider("LG-2", postdata)}
                </div>
                <div className="bg-slate-500/80 p-4 rounded-lg">
                    <Giscus
                        id="comments"
                        repo={`${process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/${process.env.NEXT_PUBLIC_GITHUB_REPO_NAME}`}
                        repoId={`${process.env.NEXT_PUBLIC_GITHUB_REPO_ID}`}
                        category="Announcements"
                        categoryId={`${process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID}`}
                        mapping="url"
                        data-strict="1"
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
        );
    }else{
        return <NotFound />
    }
}

export default DiscussionPage;