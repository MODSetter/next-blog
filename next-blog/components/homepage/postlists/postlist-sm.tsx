import postCardProvider from "../postscards/postcard-provider"
import PostMetaData from "../common-interfaces";

const PostListSm = async ({data, postcardno}:{data: PostMetaData[], postcardno:string|undefined}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:max-w-screen-xl">
        {data.map(
          (datarec: PostMetaData) => (
            <>
            {postCardProvider(postcardno, datarec)}
            </>
          )
        )}
      </div>        
    </>
  );
};



export default PostListSm