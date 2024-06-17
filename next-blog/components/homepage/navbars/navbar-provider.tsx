import NavOne from "./Navbar-one"
import NavTwo from "./Navbar-two"

export const navBarProvider = (navid: string | undefined) => {
    switch(navid){
        case "NAVBAR-1":{
            return <NavOne />
        }

        case "NAVBAR-2":{
            return <NavTwo />
        }
    }
}
