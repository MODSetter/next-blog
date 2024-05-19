import FooterOne from "./footer-one"
import FooterTwo from "./footer-two"

export const footerProvider = (footerid: string | undefined) => {
    switch(footerid){
        case "FOOTER-1":{
            return <FooterOne />
        }

        case "FOOTER-2":{
            return <FooterTwo />
        }
    }
}