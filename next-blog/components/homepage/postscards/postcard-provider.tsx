import PostMetaData from "../common-interfaces"
import PostcardOne from "./postcard-one";
import PostcardThree from "./postcard-three";
import PostcardTwo from "./postcard-two";
const postCardProvider = (postcardid: string | undefined, datarec: PostMetaData) => {
    switch(postcardid){
        case "1": {
            return <PostcardOne {...datarec} />
        }
        case "2": {
            return <PostcardTwo {...datarec} />
        }
        case "3": {
            return <PostcardThree {...datarec} />
        }
   
        default: {
            return <></>;
        }
    }
}

export default postCardProvider