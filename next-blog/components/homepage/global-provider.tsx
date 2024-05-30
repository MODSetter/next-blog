import postListProvider from "./postlists/postlist-provider"

const globalComponentProvider = async (compId: string) => {
    if(compId?.startsWith("POSTLIST")){
        return postListProvider(compId)
    }
    const comp = compId?.split("-")

    if(comp[0] === "CUSTOM"){
        switch(comp[1]){
            case "BANNER":{

            }
        }
    }
    // if(compId?.startsWith("POSTLIST")){
    //     return postListProvider(compId)
    // }else if(compId?.startsWith("NAVBAR")){
    //     return <></>
    // }else if(compId?.startsWith("CUSTOM")){
    //     return <></>
    // }


    return <></>
}



export default globalComponentProvider