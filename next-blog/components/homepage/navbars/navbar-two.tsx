"use client"
import { ThemeToggle } from "@/components/next-toggle/theme-toggle";
import { AlignLeft, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

function NavbarTwo() {
    const [user, setUser] = useState<string>("[]");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
        .then(response => response.json())
        .then(data => {
            setUser(data.navbarlinks);
        })
    }, []);

    const toggleMenu = () => {
        const menu = document.getElementById("menu");
        menu?.classList.toggle("hidden");
    };

    const closeMenu = () => {
        const menu = document.getElementById("menu");
        menu?.classList.add("hidden");
    };

    // let links = [
    //     { name: "Github", href: "/", css: "border p-2 rounded-lg", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>' },
    //     { name: "Nfl", href: "/", css: "", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>' },
    //     { name: "Nhl", href: "/", css: "", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>' },
    // ];
    // console.log(JSON.stringify(links));

    

    return (
        <header className="shadow-md bg-white/10 backdrop-blur-lg">
            <div className="container mx-auto px-4 flex items-center  justify-between py-[15px] xl:px-[22px]">
                <div className="logo flex items-center gap-2 xl:ml-0 ml-[6px]">
                    <div onClick={toggleMenu} className="block lg:hidden">
                        <AlignLeft />
                    </div>
                    {/* Logo */}
                    <h1 className="text-green-300 font-medium text-[30px] uppercase">
                        Blog.
                    </h1>
                </div>
                <nav className="hidden sm:flex sm:items-center sm:space-x-4">
                    <ul className="hidden lg:flex sm:items-center sm:space-x-4  gap-8">
                        {JSON.parse(user).map((link: any) => (
                            <li className={`flex gap-2 ${link.css}`} key={link.name}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.icon,
                                    }}></span>
                                <a
                                    href={link.href}
                                    className="block font-semibold rounded uppercase transition-all duration-150 hover:text-orange-300 "
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center xl:gap-4 gap-1 cursor-pointer">
                    <Search />
                    <ThemeToggle />
                </div>
            </div>
            {/* mobile items */}
            <div className="lg:hidden">
                <nav
                    id="menu"
                    className="hidden absolute top-0 left-0 w-64 h-screen z-10 shadow-md py-5 border bg-white/50 "
                >
                    <ul className="flex flex-col gap-6 mt-5 pl-3">
                        {JSON.parse(user).map((link: any) => (
                            <li className={`flex gap-2 ${link.css}`} key={link.name}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: link.icon,
                                }}></span>
                            <a
                                href={link.href}
                                className="block font-semibold rounded uppercase transition-all duration-150 hover:text-orange-300 "
                            >
                                {link.name}
                            </a>
                        </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="absolute top-0 right-0 text-black p-3"
                        onClick={closeMenu}
                    >
                        <X />
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default NavbarTwo;
