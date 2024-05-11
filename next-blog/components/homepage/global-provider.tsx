import postListProvider from "./postlists/postlist-provider"

const globalComponentProvider = (compId: string | undefined) => {
    if(compId?.startsWith("POSTLIST")){
        return postListProvider(compId)
    }else if(compId?.startsWith("NAVBAR")){
        return <></>
    }

    return <></>
}



export default globalComponentProvider