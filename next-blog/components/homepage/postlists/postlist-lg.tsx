import Link from "next/link";
import PostMetaData from "../common-interfaces";
import postCardProvider from "../postscards/postcard-provider";



const PostListLg = async ({ data, postcardno }: { data: PostMetaData[], postcardno: string | undefined }) => {
    return (
        <div className="flec flex-col gap-4">
            <p className="text-3xl font-semibold my-4">POSTS :</p>
            <div className="flex flex-col items-center lg:items-stretch gap-4 p-2">
                {data.map(
                    (datarec: PostMetaData) => (
                        <>
                            {postCardProvider(postcardno, datarec)}
                        </>
                    )
                )}
            </div>
            <div className="my-8 flex justify-center">
                <Link href={"/posts/1"}>
                    <p className="py-4 px-8 border rounded-full font-semibold backdrop-blur-lg bg-emerald-400/10">READ MORE POSTS</p>
                </Link>
            </div>
        </div>
    );
};


export default PostListLg