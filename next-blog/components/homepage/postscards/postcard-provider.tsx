import PostMetaData from "../common-interfaces"
import PostcardSmOne from "./small/postcard-sm-one";
import PostcardSmTwo from "./small/postcard-sm-two";
import PostcardLgOne from "./large/postcard-lg-one";
import PostcardLgTwo from "./large/postcard-lg-two";
const postCardProvider = (postScrId: string | undefined, datarec: PostMetaData) => {
    const data = postScrId?.split("-");

    if(data && data[0] && data[1]){
        switch(data[0]){
            case "SM": {
                switch(data[1]){
                    case "1":{
                        return <PostcardSmOne {...datarec} />
                    }
                    case "2":{
                        return <PostcardSmTwo {...datarec} />
                    }
                    default: {
                        return <></>;
                    }

                }
            }
            case "LG": {
                switch(data[1]){
                    case "1":{
                        return <PostcardLgOne {...datarec} />
                    }

                    case "2":{
                        return <PostcardLgTwo {...datarec} />
                    }
  
                    default: {
                        return <></>;
                    }
                }
            }
            default: {
                return <></>;
            }
        }
    }
}

export default postCardProvider