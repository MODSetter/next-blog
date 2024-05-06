import { Eye } from "lucide-react";

interface PostMetaData {
    title: string;
    opengraphimage: string;
    slug: string;
    updatedAt: Date;
    metaDescription: string | null;
    views: number;
    tags: { tagname: string; }[];
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

const PostListTwo = async () => {
    const allPostMetaData = await allPostMetaDataRequest();
    console.log(allPostMetaData);
    return (
        <>
            <div className="flex flex-col items-center lg:items-stretch gap-4 p-2">
                {allPostMetaData.map(
                    ({
                        slug,
                        opengraphimage,
                        title,
                        metaDescription,
                        updatedAt,
                        views,
                        tags,
                    }: PostMetaData) => (

                        <article className="flex max-w-md flex-col rounded-2xl p-4 bg-white/10 backdrop-blur-lg shadow md:max-w-5xl md:flex-row md:items-center" key={slug}>
                            <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
                                <img className="rounded-2xl" src={opengraphimage} alt="opengraphimage" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <Eye className="" size={20} />
                                    <span className="text-sm">{views}</span>
                                </div>
                                <a href="#" className="mb-4 block text-2xl font-medium">{title}</a>
                                <p className="mb-6">{metaDescription}</p>
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full object-cover" src={"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="Simon Lewis" />
                                    <p className="ml-4 w-56">
                                        <strong className="block font-medium">Johanson Levinsiki</strong>
                                        <span className="text-sm">{(new Date(updatedAt)).toDateString()}</span>
                                    </p>
                                </div>
                            </div>
                        </article>


                    )
                )}
            </div>
        </>
    );
};


export default PostListTwo