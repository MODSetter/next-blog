import postCardProvider from "../postscards/postcard-provider"
import PostMetaData from "../common-interfaces";
import Link from "next/link";

const PostListSm = async ({ data, postcardno }: { data: PostMetaData[], postcardno: string | undefined }) => {
  return (

    <div className="flec flex-col gap-4 justify-evenly">
      <p className="text-3xl font-semibold my-4">POSTS :</p>
      <div className="grid grid-cols-1 gap-6 px-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:max-w-screen-xl">
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



export default PostListSm