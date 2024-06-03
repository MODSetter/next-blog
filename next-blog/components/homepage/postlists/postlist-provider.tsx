import PostListSm from "./postlist-sm";
import PostListLg from "./postlist-lg";
import PostMetaData from "../common-interfaces";
import prisma from "@/db/prismaclient";

async function allPostMetaDataRequest() {
    const posts: any = await prisma.post.findMany({
        include: {
            author: true,
        },
        where : {
            visibility: true
        }
      })
      return posts
}

const postListProvider = async (postListType: string | undefined) => {
    const allPostMetaData = await allPostMetaDataRequest();
    const firsttenposts = allPostMetaData.slice(0,10);
    // console.log("postlist-provider",firstten)
    const cardno = postListType?.slice(-4);
    if(postListType?.startsWith("POSTLIST-SM")){
        return <PostListSm data={firsttenposts} postcardno={cardno}/>
    }else if(postListType?.startsWith("POSTLIST-LG")){
        return <PostListLg data={firsttenposts} postcardno={cardno}/>
    }
    else{
        return <></>
    }
}

export default postListProvider