import NavbarOne from "./navbar-one"
import NavbarTwo from "./navbar-two"

export const navBarProvider = (navid: string | undefined) => {
    switch(navid){
        case "NAVBAR-1":{
            return <NavbarOne />
        }

        case "NAVBAR-2":{
            return <NavbarTwo />
        }
    }
}
