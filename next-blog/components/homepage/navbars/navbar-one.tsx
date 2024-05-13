"use client"
import { AlignLeft, Search, X } from "lucide-react";
import logo from "../assets/logo.png";
import { ThemeToggle } from "@/components/next-toggle/theme-toggle";

function NavbarOne() {
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.add("hidden");
  };

  let links = [
    { id: 1, name: "Nba", href: "/" },
    { id: 2, name: "Nfl", href: "/" },
    { id: 3, name: "Nhl", href: "/" },
    { id: 4, name: "Mlb", href: "/" },
    { id: 5, name: "Soccer", href: "/" },
    { id: 6, name: "Fantasy", href: "/" },
    { id: 7, name: "Nascar", href: "/" },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 flex items-center  justify-between py-[15px] xl:px-[22px]">
        <div className="logo flex items-center gap-2 xl:ml-0 ml-[6px]">
          <div onClick={toggleMenu} className="block lg:hidden">
            <AlignLeft />
          </div>
          Next-Blog
          {/* Logo */}
          {/* <img src={logo} alt="" /> */}
        </div>
        <nav className="hidden sm:flex sm:items-center sm:space-x-4">
          <ul className="hidden lg:flex sm:items-center sm:space-x-4  gap-8">
            {links.map((link) => (
              <li key={link.id}>
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
          {/* <button className="bg-[#53AA51] rounded-[40px] border-2 border-[#53AA51] uppercase transition-all duration-300 hover:bg-transparent text-[14px] text-white px-[24px] py-[7px] font-bold hover:text-black ">
            Sign in
          </button> */}
        </div>
      </div>
      {/* mobile items */}
      <div className="lg:hidden">
        <nav
          id="menu"
          className="hidden absolute top-0 left-0 w-64 h-screen z-10 bg-white shadow-md py-5 border  "
        >
          <ul className="flex flex-col gap-6 mt-5 pl-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="block px-2 py-1 text-black font-semibold uppercase"
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

export default NavbarOne;
