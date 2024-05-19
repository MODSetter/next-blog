import Image from "next/image"
import favicon from "@/app/favicon.ico"

const FooterTwo = () => {
    return (
        <>
            <footer className="relative mt-20 shadow-l border bg-white/10 backdrop-blur-lg px-4 pt-20">
                <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2"><Image className="h-full object-contain" src={favicon} alt="icon" /></div>
                <nav aria-label="Footer Navigation" className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
                    <a href="#" className="font-medium ">Demo</a>
                    <a href="#" className="font-medium ">Support</a>
                    <a href="#" className="font-medium ">Privacy Policy</a>
                    <a href="#" className="font-medium ">Terms & Conditions</a>
                </nav>
                <p className="py-10 text-center ">© 2024 Next-Blog | All Rights Reserved</p>
            </footer>

        </>
    )
}

export default FooterTwo