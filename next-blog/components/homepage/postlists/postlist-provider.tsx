import PostListOne from "./PostListOne"
import PostListTwo from "./PostListTwo"

const postListProvider = (postListId: string | undefined) => {
    switch(postListId){
        case "POSTLIST-1": {
            return <PostListOne />
        }
        case "POSTLIST-2": {
            return <PostListTwo />
        }
        case "POSTLIST-3": {
            return  <></>
        }
        case "POSTLIST-4": {
            return <></>
        }
        default: {
            return <PostListOne />;
        }
    }
}

export default postListProvider