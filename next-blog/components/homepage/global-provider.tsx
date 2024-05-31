import { customComponentProvider } from "./customcmp/custom-cmp-provider"
import postListProvider from "./postlists/postlist-provider"

export const globalComponentProvider = async (compId: string | undefined) => {
    if(compId?.startsWith("POSTLIST")){
        return postListProvider(compId)
    }
    const comp = compId?.split("-")
    if(comp?.length === 3){
        if(comp[0] === "CUSTOM"){
            switch(comp[1]){
                case "BANNER":{
                    return customComponentProvider(comp[2])
                }
            }
        }
    }
    return <></>
}


