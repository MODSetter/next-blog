import PostMetaData from "../common-interfaces";
import postCardProvider from "../postscards/postcard-provider";



const PostListLg = async ({data, postcardno}:{data: PostMetaData[], postcardno:string|undefined}) => {
    return (
        <>
            <div className="flex flex-col items-center lg:items-stretch gap-4 p-2">
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


export default PostListLg