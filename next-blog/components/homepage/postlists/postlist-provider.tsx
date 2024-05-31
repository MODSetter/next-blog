import PostListSm from "./postlist-sm";
import PostListLg from "./postlist-lg";

async function allPostMetaDataRequest() {
    let cacheValidateAt = 5; //Default Cache Timeout
    if (`${process.env.HOMEPAGE_CACHE_REVALIDATE}`) {
      cacheValidateAt = parseInt(`${process.env.HOMEPAGE_CACHE_REVALIDATE}`);
    } else {
      console.log("Wrong Home Cache Vals in Env");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      next: { revalidate: cacheValidateAt },
    });
    return response.json();
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